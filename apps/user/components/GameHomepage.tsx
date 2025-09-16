'use client'
import { useState } from 'react';
import { FaCrown, FaFire, FaTrophy, FaUserFriends, FaCoins, FaChartLine, FaArrowUp } from 'react-icons/fa';
import Navbar from './navbar';
export default function GamifiedHomepage() {
  // const [dailyClaimed, setDailyClaimed] = useState(false);
  const [referralCode] = useState('PAYCHEY-7X9B');

  // Mock user data for leaderboard
  const [leaderboard] = useState([
    { id: 1, name: "Alex Johnson", points: 12450, streak: 21, rank: 1 },
    { id: 2, name: "Sarah Williams", points: 11800, streak: 18, rank: 2 },
    { id: 3, name: "Michael Chen", points: 11230, streak: 15, rank: 3 },
    { id: 4, name: "Emma Rodriguez", points: 9850, streak: 12, rank: 4 },
    { id: 5, name: "David Kim", points: 8740, streak: 9, rank: 5 },
  ]);

  // Mock achievements data
  const achievements = [
    { id: 1, name: "First Payment", icon: <FaCoins className="text-yellow-400" />, unlocked: true },
    { id: 2, name: "Referral Master", icon: <FaUserFriends className="text-blue-400" />, unlocked: true },
    { id: 3, name: "7-Day Streak", icon: <FaFire className="text-orange-500" />, unlocked: true },
    { id: 4, name: "Top 10 Player", icon: <FaTrophy className="text-purple-500" />, unlocked: false },
    { id: 5, name: "Payment Pro", icon: <FaCoins className="text-yellow-400" />, unlocked: false },
    { id: 6, name: "Elite Rank", icon: <FaCrown className="text-yellow-300" />, unlocked: false },
  ];

  // const claimDailyReward = () => {
  //   if (!dailyClaimed) {
  //     setDailyClaimed(true);
  //     setStreak(streak + 1);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <Navbar />

      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between mb-16 mt-8">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="inline-flex items-center bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full text-sm mb-4 font-medium">
              <FaFire className="mr-2 text-orange-500" /> {8} day streak!
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Payments Made <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Fun & Rewarding</span>
            </h1>

            <p className="text-gray-600 text-lg mb-8 max-w-lg">
              Experience the future of payments with PayChey - where every transaction earns you points, unlocks achievements, and climbs the leaderboard!
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-lg font-medium transition transform hover:-translate-y-0.5 shadow-lg">
                Start Playing
              </button>
              <button className="bg-white border border-gray-300 hover:border-indigo-300 text-gray-700 hover:text-indigo-700 px-6 py-3 rounded-lg font-medium transition shadow-sm">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative max-w-lg mx-auto">
              {/* Hero card with enhanced floating animation */}
              <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transform rotate-2 transition-all duration-300 hover:shadow-2xl hover:rotate-0">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
                  <div className="flex justify-between items-center">
                    <div className="text-white">
                      <p className="text-sm opacity-90">Available Balance</p>
                      <p className="text-2xl font-bold flex items-center">
                        <FaCoins className="mr-2 text-yellow-300" />
                        ฿12,560.75
                      </p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
                        <span className=" font-bold text-sm  text-white">12</span>

                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Send to</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold mr-2">
                          JJ
                        </div>
                        <p className="font-medium text-gray-900">John Johnson</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Verified</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm text-gray-500 mb-2">Amount</p>
                    <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                      <span className="text-gray-500 mr-2 text-lg">฿</span>
                      <input
                        type="text"
                        placeholder="0.00"
                        className="text-xl font-bold w-full bg-transparent outline-none"
                        defaultValue="250.00"
                      />
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
                        MAX
                      </button>
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-gray-500">Min: ฿10</span>
                      <span className="text-xs text-gray-500">Fee: ฿0.00</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition transform hover:-translate-y-0.5 shadow-md flex items-center justify-center">
                      <FaCoins className="mr-2" />
                      Send Payment
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center border border-gray-300 hover:border-indigo-300 rounded-lg bg-white text-gray-600 hover:text-indigo-600 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced floating cards */}
              <div className="absolute -top-6 -right-6 w-32 h-40 bg-gradient-to-br from-green-50 to-white rounded-xl shadow-lg border border-green-100 transform rotate-6 animate-float z-0">
                <div className="p-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mb-3 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-xs text-center text-gray-600 mb-1">Payment sent</p>
                  <p className="font-medium text-center text-gray-900">Sarah Johnson</p>
                  <p className="text-lg font-bold text-center mt-2 text-green-600">฿150.00</p>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 w-32 h-40 bg-gradient-to-br from-purple-50 to-white rounded-xl shadow-lg border border-purple-100 transform -rotate-6 animate-float z-0" style={{ animationDelay: '2s' }}>
                <div className="p-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mb-3 mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs text-center text-gray-600 mb-1">Received from</p>
                  <p className="font-medium text-center text-gray-900">Alex Morgan</p>
                  <p className="text-lg font-bold text-center mt-2 text-purple-600">฿85.50</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Card */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 mb-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/20 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <div className="mr-3">
                  <FaChartLine className="text-xl" />
                </div>
                <div className="text-lg font-semibold">Your Progress</div>
              </div>
              <div className="flex items-end">
                <div className="text-3xl font-bold mr-2">68%</div>
                <div className="text-green-300 flex items-center">
                  <FaArrowUp className="mr-1" /> 12%
                </div>
              </div>
            </div>

            <div className="bg-white/20 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <div className="mr-3">
                  <FaTrophy className="text-xl" />
                </div>
                <div className="text-lg font-semibold">Next Reward</div>
              </div>
              <div className="flex items-end">
                <div className="text-3xl font-bold mr-2">฿1000</div>
                <div className="text-sm">at Level 15</div>
              </div>
            </div>

            <div className="bg-white/20 p-4 rounded-xl">
              <div className="flex items-center mb-2">
                <div className="mr-3">
                  <FaCoins className="text-xl" />
                </div>
                <div className="text-lg font-semibold">Points Today</div>
              </div>
              <div className="flex items-end">
                <div className="text-3xl font-bold mr-2">120</div>
                <div className="text-sm">from 3 payments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Forbes-Style Leaderboard */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Global Leaderboard</h2>
            <div className="flex items-center text-indigo-600">
              <span className="mr-2 font-medium">Your rank: #42</span>
              <div className="bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="font-bold">42</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-indigo-50 border-b border-gray-200 font-semibold text-gray-700">
              <div className="col-span-1">Rank</div>
              <div className="col-span-6">Player</div>
              <div className="col-span-3">Points</div>
              <div className="col-span-2">Streak</div>
            </div>

            <div className="divide-y divide-gray-100">
              {leaderboard.map(player => (
                <div
                  key={player.id}
                  className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-indigo-50/50 transition"
                >
                  <div className="col-span-1 flex items-center">
                    {player.rank === 1 ? (
                      <FaCrown className="text-yellow-400 text-xl" />
                    ) : player.rank === 2 ? (
                      <FaCrown className="text-gray-400 text-xl" />
                    ) : player.rank === 3 ? (
                      <FaCrown className="text-amber-700 text-xl" />
                    ) : (
                      <span className="font-medium">{player.rank}</span>
                    )}
                  </div>

                  <div className="col-span-6 flex items-center">
                    <div className="bg-indigo-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <span className="font-bold text-indigo-700">{player.name.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{player.name}</span>
                  </div>

                  <div className="col-span-3 flex items-center">
                    <FaCoins className="text-yellow-400 mr-2" />
                    <span className="font-medium">{player.points.toLocaleString()}</span>
                  </div>

                  <div className="col-span-2 flex items-center">
                    <FaFire className={`mr-2 ${player.streak > 7 ? 'text-orange-500' : 'text-gray-400'}`} />
                    <span className="font-medium">{player.streak} days</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Referral & Achievements Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Referral System */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                <FaUserFriends className="text-indigo-600 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Invite Friends, Earn Rewards</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Share your referral code with friends and earn 500 XP for each friend who joins and makes their first payment!
            </p>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-6">
              <div className="text-gray-500 text-sm mb-1">Your Referral Code</div>
              <div className="flex justify-between items-center">
                <div className="text-xl font-mono font-bold text-gray-900">{referralCode}</div>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
                  Copy
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold mb-1 text-gray-900">5</div>
                <div className="text-gray-500 text-sm">Friends Invited</div>
              </div>
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl text-center">
                <div className="text-3xl font-bold mb-1 text-gray-900">2,500</div>
                <div className="text-gray-500 text-sm">XP Earned</div>
              </div>
              <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-4 rounded-xl text-center text-white">
                <div className="text-3xl font-bold mb-1">฿2500</div>
                <div className="text-indigo-100 text-sm">Bonus Cash</div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <div className="bg-indigo-100 rounded-lg w-12 h-12 flex items-center justify-center mr-4">
                <FaTrophy className="text-yellow-500 text-xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Your Achievements</h3>
            </div>

            <p className="text-gray-600 mb-6">
              Unlock achievements to earn XP, level up, and climb the leaderboard!
            </p>

            <div className="grid grid-cols-3 gap-4">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-xl flex flex-col items-center justify-center border ${achievement.unlocked
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                    }`}
                >
                  <div className="text-3xl mb-2">
                    {achievement.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-medium mb-1 text-gray-900">{achievement.name}</div>
                    <div className={`text-xs ${achievement.unlocked ? 'text-green-600' : 'text-gray-500'
                      }`}>
                      {achievement.unlocked ? 'Unlocked!' : 'Locked'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Game-Changing Payment Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
                  <FaCoins className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">XP with Every Payment</h3>
              <p className="text-gray-600">
                Earn experience points for every transaction. More payments = more XP = higher ranks!
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
                  <FaFire className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Daily Streak Bonuses</h3>
              <p className="text-gray-600">
                Log in daily to keep your streak alive and earn increasing rewards each day!
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 text-center hover:shadow-md transition">
              <div className="bg-indigo-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6">
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 w-10 h-10 rounded-lg flex items-center justify-center">
                  <FaTrophy className="text-white text-xl" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Elite Tiers & Rewards</h3>
              <p className="text-gray-600">
                Reach new tiers for exclusive rewards, cashback, and special privileges.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold text-gray-900">Pay<span className="text-indigo-600">Chey</span></span>
              </div>
              <p className="text-gray-600 mb-6">
                Making payments fun, rewarding, and competitive. Join the game today!
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-indigo-600 transition">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-gray-900">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Leaderboard</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Achievements</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Daily Rewards</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Referral Program</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Payment XP</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-gray-900">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Careers</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Blog</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Press</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Partners</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4 text-gray-900">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">Cookie Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition">GDPR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
            <p>© 2023 PayChey. All rights reserved. Payments made fun.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
