import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { FaUsers } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Groups = () => {
 
   const { user } = useContext(AuthContext);
   const navigate = useNavigate();
 
   
   const LOCAL_STORAGE_KEY = `requestedGroups_${user?.uid || "guest"}`;
 
   const [groups, setGroups] = useState([]);
   const [loading, setLoading] = useState(true);
 
   // localStorage 
   const [requestedGroups, setRequestedGroups] = useState(() => {
     const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
     return stored ? JSON.parse(stored) : [];
   });
 
   // requestedGroups  localStorage update
   useEffect(() => {
     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(requestedGroups));
   }, [requestedGroups, LOCAL_STORAGE_KEY]);
 
   useEffect(() => {
     const demoGroups = [
       {
         _id: 1,
         name: "Tech Innovators Meetup",
         description: "Join the brightest minds to explore AI, Robotics and future technology trends.",
         image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=80",
         startDate: "2025-10-01"
       },
       {
         _id: 2,
         name: "Art & Creativity Workshop",
         description: "Unleash your inner artist through group painting, sketching and exhibitions.",
         image: "https://images.unsplash.com/photo-1496317899792-9d7dbcd928a1?auto=format&fit=crop&w=800&q=80",
         startDate: "2025-11-10"
       },
       {
         _id: 3,
         name: "Adventure & Hiking Club",
         description: "Explore nature with fellow hikers. Upcoming trip: Bandarban hills!",
         image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
         startDate: "2025-09-15"
       },
       {
         _id: 4,
         name: "Book Lovers Gathering",
         description: "Discuss bestsellers and classics over coffee every weekend.",
         image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80",
         startDate: "2025-12-25"
       },
       {
         _id: 5,
         name: "Photography Field Trip",
         description: "Capture the beauty of Dhaka city with your lens. Beginners welcome!",
         image: "https://i.ibb.co/Fqj8cQbg/images-1.jpg",
         startDate: "2025-08-20"
       },
       {
         _id: 6,
         name: "Cooking & Cuisine Night",
         description: "Try new dishes, share your recipe and enjoy a flavorful evening.",
         image: "https://i.ibb.co/2Ym6yhHW/images-2.jpg",
         startDate: "2025-10-05"
       },
     ];
 
     setTimeout(() => {
       setGroups(demoGroups);
       setLoading(false);
     }, 500);
   }, []);
 
   const isGroupActive = (startDate) => {
     if (!startDate) return false;
     const today = new Date();
     const groupStartDate = new Date(startDate);
     return groupStartDate >= today;
   };
 
   const handleJoinClick = (group) => {
     if (requestedGroups.includes(group._id)) return;
 
     toast.success(`Your request to join "${group.name}" is approvable!`, {
       position: "top-center",
       autoClose: 3000,
       theme: "colored",
     });
 
     const updatedRequested = [...requestedGroups, group._id];
     setRequestedGroups(updatedRequested);
 
     setTimeout(() => {
       navigate(`/future-group-details/${group._id}`, { state: group });
     }, 1000);
   };
 
   return (
     <section className="px-4 py-10 bg-gray-50 min-h-screen">
       {/* <h2 className="text-4xl font-bold text-center mb-12 text-primary">🌟 Featured Upcoming Groups</h2> */}
 
       {loading ? (
         <div className="flex justify-center items-center min-h-[200px]">
           <span className="loading loading-spinner text-primary text-2xl"></span>
         </div>
       ) : (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {groups.map(group => (
             <Fade key={group._id} triggerOnce>
               <div className="border border-gray-200 rounded-lg p-5 shadow-md hover:shadow-lg transition bg-white">
                 <img
                   src={group.image}
                   alt={group.name}
                   className="w-full h-48 object-cover rounded mb-3"
                 />
                 <h3 className="text-xl font-semibold mb-1">{group.name}</h3>
                 <p className="text-sm text-gray-600 mb-1">Category: Hobby</p>
                 <p className="text-gray-700 mb-2">
                   {group.description?.slice(0, 80) || 'No description available.'}
                   {group.description?.length > 80 && '...'}
                 </p>
                 <p className="text-sm text-gray-500 mb-4">
                   <strong>Start Date:</strong> {formatDate(group.startDate)}
                 </p>
 
                 {isGroupActive(group.startDate) ? (
                   requestedGroups.includes(group._id) ? (
                     <button
                       disabled
                       className="btn btn-secondary w-full cursor-not-allowed"
                     >
                       Requested
                     </button>
                   ) : (
                     <button
                       onClick={() => handleJoinClick(group)}
                       className="btn btn-primary w-full flex items-center justify-center gap-2"
                     >
                       <FaUsers /> Join This Group
                     </button>
                   )
                 ) : (
                   <p className="text-red-500 text-center font-semibold">
                     This group is no longer active
                   </p>
                 )}
               </div>
             </Fade>
           ))}
         </div>
       )}
 
       <ToastContainer />
     </section>
   );
 };

export default Groups;