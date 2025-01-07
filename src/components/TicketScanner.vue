<template>
    <div>
      <h1>Scan Ticket</h1>
      <input type="file" id="scanner" accept="image/*" @change="scanQRCode" />
      <div v-if="loading">Verifying ticket...</div>
      <div v-if="message" :class="{ success: success, error: !success }">{{ message }}</div>
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
      };
    },
    methods: {
      async scanQRCode(event) {
        try {
          this.loading = true;
          this.message = "";
  
          const file = event.target.files[0];
          if (!file) {
            this.message = "No file selected.";
            this.success = false;
            return;
          }
  
          const image = await this.readImage(file);
          const qrCodeData = jsQR(image.data, image.width, image.height);
  
          if (qrCodeData && qrCodeData.data) {
            const ticketId = qrCodeData.data;
            const response = await apiClient.verifyTicket(`/events/verify_ticket/${ticketId}`);
            this.message = response.data.message;
            this.success = response.data.status === "success";
          } else {
            this.message = "No QR code detected.";
            this.success = false;
          }
        } catch (error) {
          console.error("QR Code Scan Error:", error);
          this.message = "An error occurred while scanning the QR code.";
          this.success = false;
        } finally {
          this.loading = false;
        }
      },
      readImage(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              const context = canvas.getContext("2d");
              canvas.width = img.width;
              canvas.height = img.height;
              context.drawImage(img, 0, 0);
              resolve(context.getImageData(0, 0, img.width, img.height));
            };
            img.onerror = reject;
            img.src = event.target.result;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .success {
    color: green;
  }
  .error {
    color: red;
  }
  </style>
  