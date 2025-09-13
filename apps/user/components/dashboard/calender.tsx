// 'use client'
// import React, { useState, useEffect } from 'react';

// export default function MiniCalendar() {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [streak, setStreak] = useState(9);
//   const [claimedToday, setClaimedToday] = useState(false);
//   const [calendarDays, setCalendarDays] = useState([]);

//   // Initialize calendar
//   useEffect(() => {
//     generateCalendar();
//     checkIfClaimedToday();
//   }, [currentDate]);

//   // Generate calendar days for the current month
//   const generateCalendar = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();

//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);

//     const startDay = firstDay.getDay();
//     const daysInMonth = lastDay.getDate();

//     const daysArray = [];

//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < startDay; i++) {
//       daysArray.push({ day: null, claimed: false, isToday: false });
//     }

//     // Add days of the month
//     const today = new Date();
//     for (let day = 1; day <= daysInMonth; day++) {
//       const isToday = today.getDate() === day &&
//                       today.getMonth() === month &&
//                       today.getFullYear() === year;

//       // Check if this day was claimed
//       const claimed = day <= today.getDate() &&
//                      (month < today.getMonth() ||
//                      (month === today.getMonth() && day <= today.getDate()));

//       daysArray.push({
//         day,
//         claimed: claimed && day !== today.getDate(),
//         isToday,
//         canClaim: isToday && !claimedToday
//       });
//     }

//     setCalendarDays(daysArray);
//   };

//   // Check if user has already claimed today's bonus
//   const checkIfClaimedToday = () => {
//     const today = new Date();
//     const lastClaim = new Date(); // This would come from your backend in a real app
//     lastClaim.setDate(today.getDate() - 1); // Simulating a previous claim

//     const sameDay = lastClaim.getDate() === today.getDate() &&
//                    lastClaim.getMonth() === today.getMonth() &&
//                    lastClaim.getFullYear() === today.getFullYear();

//     setClaimedToday(sameDay);
//   };

//   // Handle claiming daily bonus
//   const claimDailyBonus = () => {
//     if (claimedToday) return;

//     setStreak(streak + 1);
//     setClaimedToday(true);

//     // Update calendar to mark today as claimed
//     const updatedDays = calendarDays.map(day => {
//       if (day.isToday) {
//         return { ...day, claimed: true, canClaim: false };
//       }
//       return day;
//     });

//     setCalendarDays(updatedDays);
//   };

//   // Navigate to previous month
//   const prevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   // Navigate to next month
//   const nextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   // Format date for display
//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       month: 'short',
//       year: 'numeric'
//     });
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-4 w-64">
//       {/* Calendar Header */}
//       <div className="flex justify-between items-center mb-4">
//         <button
//           className="p-1 rounded hover:bg-gray-100 transition"
//           onClick={prevMonth}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//           </svg>
//         </button>
//         <h2 className="text-sm font-semibold text-gray-800">{formatDate(currentDate)}</h2>
//         <button
//           className="p-1 rounded hover:bg-gray-100 transition"
//           onClick={nextMonth}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//           </svg>
//         </button>
//       </div>

//       {/* Day Headers */}
//       <div className="grid grid-cols-7 gap-1 mb-2">
//         {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
//           <div key={day} className="text-center text-xs font-medium text-gray-500">
//             {day}
//           </div>
//         ))}
//       </div>

//       {/* Calendar Grid */}
//       <div className="grid grid-cols-7 gap-1">
//         {calendarDays.map((day, index) => (
//           <div
//             key={index}
//             className={`
//               rounded-md p-1 text-xs flex items-center justify-center
//               ${day.claimed ? 'bg-green-100 text-green-800' : ''}
//               ${day.isToday ? 'bg-blue-500 text-white font-bold' : ''}
//               ${!day.day ? 'invisible' : 'text-gray-800'}
//             `}
//           >
//             {day.day}
//           </div>
//         ))}
//       </div>

//       {/* Streak and Claim Button */}
//       <div className="mt-4 flex items-center justify-between">
//         <div className="flex items-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
//           </svg>
//           <span className="text-sm text-gray-700">{streak} day streak</span>
//         </div>

//         {!claimedToday ? (
//           <button
//             className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded transition"
//             onClick={claimDailyBonus}
//           >
//             Claim
//           </button>
//         ) : (
//           <div className="text-xs text-green-600 font-medium">
//             Claimed!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }