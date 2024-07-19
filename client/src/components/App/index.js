// import React from 'react';
// import Review from './Review';

// function App() {
//   return <Review />;

// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from '../Landing';
import Search from '../Search';
import Review from '../Review';
import MyPage from '../MyPage';


const App = () => {

  return (
    <div>
      {/* <Review/> */}
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/review" element={<Review />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
    </div>
    
  );
}

export default App;