<template>
    <section class="thank-you-page">
        <h1>Thank You!</h1>
        <p>Your payment was successful.</p>
        <div v-if="transaction">
            <p><strong>Event:</strong> {{ transaction.eventTitle }}</p>
            <p><strong>Date:</strong> {{ transaction.eventDate }}</p>
            <p><strong>Location:</strong> {{ transaction.eventLocation }}</p>
        </div>
    </section>
</template>
