// import './skeleton.scss';

// const Skeleton = () => {
//     return (
//         <>
//             <p className="char__select">Please select a character to see information</p>
//             <div className="skeleton">
//                 <div className="pulse skeleton__header">
//                     <div className="pulse skeleton__circle"></div>
//                     <div className="pulse skeleton__mini"></div>
//                 </div>
//                 <div className="pulse skeleton__block"></div>
//                 <div className="pulse skeleton__block"></div>
//                 <div className="pulse skeleton__block"></div>
//             </div>
//         </>
//     )
// }

// export default Skeleton;
import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader 
      speed={2}
      width={350}
      height={180}
      viewBox="0 0 350 180"
      backgroundColor="#8f8a8a"
      foregroundColor="#3e3c3c"
      {...props}
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
      <rect x="1" y="90" rx="3" ry="3" width="178" height="6" /> 
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  )

export default Skeleton