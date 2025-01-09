<template>
  <div>
    <h1>Scan or Enter Ticket</h1>

    <div>
      <video id="scanner" autoplay muted playsinline></video>
      <button @click="startScanner">Start Scanner</button>
      <button @click="stopScanner">Stop Scanner</button>
    </div>

    <div>
      <input
        type="text"
        v-model="referenceCode"
        placeholder="Enter Reference Code"
      />
      <button @click="verifyTicket">Verify Code</button>
    </div>

    <div v-if="loading">Verifying ticket...</div>
    <div v-if="message" :class="{ success: success, error: !success }">
      {{ message }}
    </div>
  </div>
</template>

<script>
import jsQR from "jsqr";
import apiClient from "@/services/apiClient";

export default {
  data() {
    return {
      loading: false,
      message: "",
      success: false,
      referenceCode: "",
      videoStream: null,
    };
  },
  methods: {
    // Start the QR code scanner
    startScanner() {
      this.message = "";
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          this.videoStream = stream;
          const video = document.getElementById("scanner");
          video.srcObject = stream;
          video.setAttribute("playsinline", true); // Prevent fullscreen
          video.play();
          this.scanVideoFrame();
        })
        .catch((error) => {
          console.error("Camera access denied:", error);
          this.message = "Unable to access camera.";
        });
    },

    // Stop the QR code scanner
    stopScanner() {
      if (this.videoStream) {
        const tracks = this.videoStream.getTracks();
        tracks.forEach((track) => track.stop());
        this.videoStream = null;
      }
    },

    // Scan video frames for QR codes
    scanVideoFrame() {
      const video = document.getElementById("scanner");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      const scan = () => {
        if (this.videoStream) {
          if (video.videoWidth && video.videoHeight) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw video frame to canvas
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Get image data and try to decode QR code
            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
            const qrCodeData = jsQR(imageData.data, imageData.width, imageData.height);

            if (qrCodeData) {
              this.stopScanner();
              this.verifyTicket(qrCodeData.data);
            } else {
              requestAnimationFrame(scan);
            }
          } else {
            requestAnimationFrame(scan); // Retry if video is not ready
          }
        }
      };

      scan();
    },

    // Verify ticket using QR code or reference code
    async verifyTicket(ref) { 
      try {
        this.loading = true;
        this.message = "";

        const response = await apiClient.verifyTicket({ ref: ref }); 
        console.log("Response:",response);
        this.message = response.data.message;
        this.success = response.data.status === "success";
      } catch (error) {
        console.error("Verification Error:", error);
        this.message = "Failed to verify the ticket.";
        this.success = false;
      } finally {
        this.loading = false;
      }
    },
  },
  beforeUnmount() {
    this.stopScanner();
  },
};
</script>

<style scoped>
/* ... (same styles as before) ... */
</style>