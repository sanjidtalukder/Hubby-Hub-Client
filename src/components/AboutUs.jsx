import React from 'react';

const teamMembers = [
  {
    name: "Sanjid Talukder",
    role: "Founder & CEO",
    photo: "https://i.ibb.co/NgT6QfKg/image-1-1.png",
    social: {
      twitter: "https://twitter.com/amina",
      linkedin: "https://www.linkedin.com/in/md-sanjid-talukder-08b681320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      facebook: "https://www.facebook.com/share/19TNz9rmzz/", 
    },
  },
  {
    name: "Rafiq Islam",
    role: "Community Manager",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    social: {
      twitter: "https://twitter.com/rafiq",
      linkedin: "https://linkedin.com/in/rafiq",
      facebook: "https://www.facebook.com/share/19TNz9rmzz/",
    },
  },
  {
    name: "Sana Karim",
    role: "Event Coordinator",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    social: {
      twitter: "https://twitter.com/sana",
      linkedin: "https://linkedin.com/in/sana",
      facebook: "https://www.facebook.com/share/19TNz9rmzz/",
    },
  },
];

const stats = [
  { label: "Active Users", value: "12K+" },
  { label: "Events Hosted", value: "850+" },
  { label: "Groups Created", value: "300+" },
];

const testimonials = [
  {
    name: "Farhan Ahmed",
    feedback: "HobbyHub helped me connect with like-minded artists and grow my skills tremendously!",
  },
  {
    name: "Lina Akter",
    feedback: "The events are well-organized and really fun. It’s a great community for hobby lovers.",
  },
  {
    name: "Sabbir Hossain",
    feedback: "I love how easy it is to find local groups related to my hobbies. Highly recommended!",
  },
];

const AboutUs = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Main About Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="overflow-hidden rounded-xl shadow-xl transform transition-transform duration-500 hover:scale-105">
            <img
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
              alt="HobbyHub community"
              className="object-cover w-full h-[300px] md:h-[400px]"
              loading="lazy"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight">About HobbyHub</h2>
            <p className="text-gray-300 leading-relaxed text-lg">
              HobbyHub is a community-driven platform designed to connect hobbyists from all walks of life. Whether you love painting, photography, gardening, coding, or any other passion, HobbyHub helps you find, join, or organize local events tailored to your interests.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Our mission is to foster a vibrant community where enthusiasts can share knowledge, collaborate on projects, and make meaningful connections. Through easy-to-use event management tools and an intuitive interface, HobbyHub empowers you to turn your hobbies into shared experiences.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              Join us today and start exploring exciting local events that match your passion. Let's make hobbying social and fun!
            </p>
            <a
              href="/groups"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-md shadow-lg font-semibold hover:from-pink-600 hover:to-purple-500 transition-colors duration-300"
            >
              Explore Groups
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white bg-opacity-10 rounded-xl p-8 text-center grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map(({ label, value }) => (
            <div key={label}>
               
              <p className="text-4xl text-gray-900  font-bold">{value}</p>
              <p className="text-gray-700 mt-2">{label}</p>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">


            {teamMembers.map(({ name, role, photo, social }) => (
              <div key={name} className="bg-white bg-opacity-10 rounded-xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={photo}
                  alt={name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                  loading="lazy"
                />
                <h4 className="text-xl text-gray-900 font-semibold">{name}</h4>
                <p className="text-gray-500 mb-4">{role}</p>
                <div className="flex space-x-4 text-gray-500">
                               <a href={social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
  <svg className="w-6 h-6 hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
  </svg>
</a>

                  {social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                      <svg className="w-6 h-6 hover:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                      </svg>
                    </a>
                  )}
                  {social.linkedin && (
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <svg className="w-6 h-6 hover:text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 3a2 2 0 110 4 2 2 0 010-4z" />
                      </svg>
                    </a>
                  )}
      
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-3xl font-bold mb-8 text-center">What Our Users Say</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            {testimonials.map(({ name, feedback }) => (
              <blockquote
                key={name}
                className="bg-white bg-opacity-10 rounded-xl p-6 italic text-gray-400 shadow-md"
              >
                <p>"{feedback}"</p>
                <footer className="mt-4 font-semibold text-right">— {name}</footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Video Intro */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">Watch Our Story</h3>
          <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
            {/* <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="HobbyHub Intro Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe><br></br> */}
           <iframe 
            src="https://www.youtube.com/embed/01l0s1iR_ZI?si=Qil17-6YEwMp5srq"
            className="w-full h-full"
             title="YouTube video player"
              frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center mt-12">
          <h3 className="text-3xl font-bold mb-6">Follow Us</h3>
          <div className="flex justify-center space-x-8 text-gray-300 text-3xl">
            <a href="https://facebook.com/hobbyhub" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600 transition-colors duration-300">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.83c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 16.99 22 12z" />
              </svg>
            </a>
            <a href="https://twitter.com/hobbyhub" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition-colors duration-300">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a href="https://instagram.com/hobbyhub" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500 transition-colors duration-300">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm4.5-3a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
