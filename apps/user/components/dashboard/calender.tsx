'use client'
import React, { useState, useEffect } from 'react';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [streak, setStreak] = useState(9);
  const [longestStreak, setLongestStreak] = useState(11);
  const [lastClaimDate, setLastClaimDate] = useState(new Date());
  const [balance, setBalance] = useState(20000);
  const [calendarDays, setCalendarDays] = useState([]);
  const [claimedToday, setClaimedToday] = useState(false);
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);

  // Initialize calendar
  useEffect(() => {
    generateCalendar();
    checkIfClaimedToday();
  }, [currentDate, lastClaimDate]);

  // Generate calendar days for the current month
  const generateCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    
    const daysArray = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      daysArray.push({ day: null, claimed: false, isToday: false });
    }
    
    // Add days of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month + 1}-${day}`;
      const isToday = today.getDate() === day && 
                      today.getMonth() === month && 
                      today.getFullYear() === year;
      
      // Check if this day was claimed (simplified logic)
      const claimed = day <= today.getDate() && 
                     (month < today.getMonth() || 
                     (month === today.getMonth() && day <= today.getDate()));
      
      daysArray.push({ 
        day, 
        claimed: claimed && day !== today.getDate(), 
        isToday,
        canClaim: isToday && !claimedToday
      });
    }
    
    setCalendarDays(daysArray);
  };

  // Check if user has already claimed today's bonus
  const checkIfClaimedToday = () => {
    const today = new Date();
    const lastClaim = new Date(lastClaimDate);
    
    const sameDay = lastClaim.getDate() === today.getDate() &&
                   lastClaim.getMonth() === today.getMonth() &&
                   lastClaim.getFullYear() === today.getFullYear();
    
    setClaimedToday(sameDay);
  };

  // Handle claiming daily bonus
  const claimDailyBonus = () => {
    if (claimedToday) return;
    
    const today = new Date();
    const lastClaim = new Date(lastClaimDate);
    
    // Check if consecutive day (for streak)
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const isConsecutive = lastClaim.getDate() === yesterday.getDate() &&
                         lastClaim.getMonth() === yesterday.getMonth() &&
                         lastClaim.getFullYear() === yesterday.getFullYear();
    
    // Update streak
    const newStreak = isConsecutive ? streak + 1 : 1;
    const newLongestStreak = Math.max(longestStreak, newStreak);
    
    setStreak(newStreak);
    setLongestStreak(newLongestStreak);
    setLastClaimDate(today);
    setBalance(balance + 50);
    setClaimedToday(true);
    setShowCoinAnimation(true);
    
    // Update calendar to mark today as claimed
    const updatedDays = calendarDays.map(day => {
      if (day.isToday) {
        return { ...day, claimed: true, canClaim: false };
      }
      return day;
    });
    
    setCalendarDays(updatedDays);
    
    // Hide coin animation after 1 second
    setTimeout(() => setShowCoinAnimation(false), 1000);
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-700 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
              <i className="fas fa-calendar-alt mr-3"></i>Daily Bonus Calendar
            </h1>
            <div className="flex items-center space-x-2 bg-blue-800 bg-opacity-30 px-4 py-2 rounded-full">
              <i className="fas fa-coins text-yellow-400"></i>
              <span className="font-bold">{balance.toLocaleString()}</span>
              <span className="text-gray-100">coins</span>
            </div>
          </div>
          
          {/* Streak Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-700 bg-opacity-30 p-4 rounded-lg text-center">
              <div className="text-sm font-semibold mb-1">CURRENT STREAK</div>
              <div className="flex justify-center items-center">
                <div className="text-2xl mr-2 text-yellow-400">
                  <i className="fas fa-fire"></i>
                </div>
                <div className="text-2xl font-bold">{streak} days</div>
              </div>
            </div>
            
            <div className="bg-blue-700 bg-opacity-30 p-4 rounded-lg text-center">
              <div className="text-sm font-semibold mb-1">LONGEST STREAK</div>
              <div className="text-2xl font-bold">{longestStreak} days</div>
            </div>
            
            <div className="bg-blue-700 bg-opacity-30 p-4 rounded-lg text-center">
              <div className="text-sm font-semibold mb-1">LAST CLAIM</div>
              <div className="text-xl font-bold">{claimedToday ? 'Today' : 'Not claimed'}</div>
            </div>
          </div>
        </div>
        
        {/* Calendar Navigation */}
        <div className="flex justify-between items-center p-4 bg-gray-50 border-b">
          <button 
            className="p-2 rounded-full hover:bg-gray-200 transition"
            onClick={prevMonth}
          >
            <i className="fas fa-chevron-left text-gray-700"></i>
          </button>
          <h2 className="text-xl font-bold text-gray-800">{formatDate(currentDate)}</h2>
          <button 
            className="p-2 rounded-full hover:bg-gray-200 transition"
            onClick={nextMonth}
          >
            <i className="fas fa-chevron-right text-gray-700"></i>
          </button>
        </div>
        
        {/* Calendar Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, index) => (
              <div 
                key={index} 
                className={`
                  rounded-lg p-2 h-16 sm:h-20 flex flex-col items-center justify-center
                  ${day.claimed ? 'bg-green-100 border border-green-300' : ''} 
                  ${day.isToday ? 'bg-blue-100 border-2 border-blue-400' : ''}
                  ${!day.day ? 'bg-transparent' : 'bg-gray-100'}
                `}
              >
                {day.day && (
                  <>
                    <div className="text-sm font-medium">{day.day}</div>
                    {day.claimed && (
                      <div className="mt-1 text-green-600 text-xs sm:text-sm">
                        <i className="fas fa-check-circle"></i>
                      </div>
                    )}
                    {day.isToday && day.canClaim && (
                      <button 
                        className="mt-1 bg-orange-500 hover:bg-orange-600 text-white text-xs px-2 py-1 rounded-full transition"
                        onClick={claimDailyBonus}
                      >
                        Claim 50 <i className="fas fa-coins ml-1"></i>
                      </button>
                    )}
                    {day.isToday && claimedToday && (
                      <div className="mt-1 text-green-600 text-xs font-medium">
                        Claimed!
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Claim Button for Mobile */}
        <div className="p-4 border-t bg-gray-50">
          {!claimedToday ? (
            <button 
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
              onClick={claimDailyBonus}
            >
              {showCoinAnimation ? (
                <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-yellow-400 opacity-75"></span>
              ) : null}
              <i className="fas fa-gift mr-2"></i>
              Claim Your Daily Bonus - 50 Coins
              <i className="fas fa-coins ml-2"></i>
            </button>
          ) : (
            <div className="text-center py-3 bg-green-100 text-green-700 rounded-lg font-semibold">
              <i className="fas fa-check-circle mr-2"></i>
              Today's bonus already claimed!
            </div>
          )}
        </div>
        
        {/* Info Section */}
        <div className="p-6 bg-gray-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Daily Bonus Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <i className="fas fa-calendar-check text-blue-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Daily Claim</h4>
                <p className="text-gray-600">Claim your bonus each day to maintain your streak</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <i className="fas fa-fire text-green-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Streak Bonus</h4>
                <p className="text-gray-600">Longer streaks give bonus rewards</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <i className="fas fa-coins text-yellow-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">50 Coins Daily</h4>
                <p className="text-gray-600">Each claim gives you 50 coins</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <i className="fas fa-exclamation-triangle text-red-600"></i>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Don't Break Streak</h4>
                <p className="text-gray-600">If you miss a day, your streak will reset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
