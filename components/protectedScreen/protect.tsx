// // src/cemnnoopst / ProtectedScreen.tsx;
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { router } from "expo-router";
// import { View, ActivityIndicator } from "react-native";

// const ProtectedScreen = ({ children }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (!isAuthenticated) {
//       router.replace("/");
//       return;
//     }

//     if (user?.usertype !== "Admin") {
//       alert("You do not have permission to view this page");
//       router.replace("/home");
//     }
//   }, [isAuthenticated, user]);

//   if (!isAuthenticated) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return children;
// };

// export default ProtectedScreen;
