<script setup>
import downloads from "../data/downloads";
</script>

<template>
    <!-- Download Section Start -->
    <div id="download-section" class="container mx-auto px-5 md:w-4/5">
        <section class="py-16 pt-18">
            <div class="w-4/5 md:w-3/5 mx-auto">
                <h2 class="text-1xl md:text-4xl font-theme-heading font-medium text-center">Contáctanos</h2>
                <p class="text-theme-grayish-blue text-center text-lg font-theme-content mt-7">Si tienes alguna pregunta acerca de nuestros productos o servicios, por favor rellena el siguiente formulario y en breve nos pondremos en contacto contigo. También nos puedes llamar por teléfono o incluso venir a visitarnos – ¡esperamos verte pronto!</p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-1 gap-8 mt-12">
                <div v-for="(download, index) in downloads" :key="download.id" :class="[index === 0 ? 'lg:mb-10' : '', index === 1 ? 'lg:mt-10' : '']" class="shadow-lg rounded-lg">
                    <div class="flex justify-center mt-12">
                        <img :src="download.icon" alt="Browser Logo"  />
                    </div>
                    <h3 class="text-2xl font-theme-heading font-medium text-center mt-6">{{ download.title }}</h3>
                    <p class="text-md font-theme-content text-theme-grayish-blue text-center mt-3">{{ download.subTitle }}</p>
                    <div class="my-7">
                        <img class="w-full" src="/images/bg-dots.svg" alt="Dot Backaground" />
                    </div>
                    <div class="flex justify-center mb-8">
                        <LinkButton btn-type="primary" :link="download.link" class="text-sm">Enviar Mensaje</LinkButton>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <!-- Download Section End -->
</template>
