import React from 'react'

function Footer() {
    return (

        <>
            <footer className="bg-gray-800 py-10 px-5 border-t border-gray-300">
                <div className="container mx-auto flex flex-wrap justify-between">
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">About</h4>
                        <ul>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Contact Us</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">About Us</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Careers</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Flipkart Stories</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Press</li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Help</h4>
                        <ul>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Payments</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Shipping</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Cancellation & Returns</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">FAQ</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Report Infringement</li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Policy</h4>
                        <ul>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Return Policy</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Terms Of Use</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Security</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Privacy</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Sitemap</li>
                        </ul>
                    </div>
                    <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Social</h4>
                        <ul>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Facebook</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">Twitter</li>
                            <li className="text-white mb-2 hover:text-blue-600 cursor-pointer">YouTube</li>
                        </ul>
                    </div>
                </div>
            </footer>



        </>
    )
}

export default Footer
