const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-10  bottom-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 ">
          <div>
            <h3 className="text-xl font-semibold mb-4">About</h3>
            <h5>Let your feet do the talking</h5>
            <p className="text-sm text-justify">
              STEP WHISPER brings you the latest and trendiest shoes from around the world. Whether you&apos;re looking for comfort, style, or performance, we have something for everyone.
            </p>
          </div>
  
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2">
                <a href="/" className="hover:text-gray-400">Home</a>
              </li>
              <li className="mb-2">
                <a href="/men" className="hover:text-gray-400">Men&apos;s Shoes</a>
              </li>
              <li className="mb-2">
                <a href="/women" className="hover:text-gray-400">Women&apos;s Shoes</a>
              </li>
              <li className="mb-2">
                <a href="/kids" className="hover:text-gray-400">Kid&apos;s Shoes</a>
              </li>
              <li className="mb-2">
                <a href="/cart" className="hover:text-gray-400">Cart</a>
              </li>
              <li className="mb-2">
                <a href="/login" className="hover:text-gray-400">Login</a>
              </li>
            </ul>
          </div>
          <div>
          <h3 className="text-xl font-semibold mb-4">Get Help</h3>
          <ul>
              <li className="mb-2">
                <a href="/terms" className="hover:text-gray-400">Term of use</a>
              </li>
              <li className="mb-2">
                <a href="/policy" className="hover:text-gray-400">Payment</a>
              </li>
              <li className="mb-2">
                <a href="/returns" className="hover:text-gray-400">Cancellation and Returns</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2">Email: support@stepwhisper.com</p>
            <p className="text-sm mb-2">Phone: +91 987345629</p>
            <p className="text-sm">Address: 123 Shoe St, Fashion City, India</p>
          </div>
        </div>
  
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>&copy; 2024 STEP WHISPER. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            <a href="#" className="hover:text-gray-400">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer 
  