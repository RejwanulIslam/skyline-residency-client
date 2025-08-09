import React from 'react'

export default function AboutBuilding() {
    return (
        <section class="about-building py-16 bg-gray-100">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-4xl md:text-5xl font-bold text-center text-gray-800 font-playfair mb-8 tracking-wide">
                    About Our Building
                </h2>
                <p class="text-lg md:text-xl text-gray-600 font-lora text-center max-w-3xl mx-auto mb-12 leading-relaxed">
                    Welcome to <span class="font-bold text-orange-500">Skyline Residency</span>, a modern architectural marvel designed to offer unparalleled comfort and convenience. Nestled in the heart of the city, our building combines luxury with functionality, providing residents with state-of-the-art amenities and a vibrant community atmosphere. With a focus on sustainability and modern living, Skyline Residency is more than just a place to live—it's a lifestyle.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                        <h3 class="text-xl md:text-2xl font-semibold text-gray-800 font-roboto mb-4">Prime Location</h3>
                        <p class="text-gray-600 font-open-sans text-base leading-relaxed">
                            Located centrally with easy access to shopping centers, schools, and public transport, ensuring you’re always connected.
                        </p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                        <h3 class="text-xl md:text-2xl font-semibold text-gray-800 font-roboto mb-4">Modern Amenities</h3>
                        <p class="text-gray-600 font-open-sans text-base leading-relaxed">
                            Enjoy a rooftop pool, 24/7 gym, and dedicated parking spaces designed for your comfort and leisure.
                        </p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                        <h3 class="text-xl md:text-2xl font-semibold text-gray-800 font-roboto mb-4">Sustainable Design</h3>
                        <p class="text-gray-600 font-open-sans text-base leading-relaxed">
                            Eco-friendly materials and energy-efficient systems make our building a green choice for modern living.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
