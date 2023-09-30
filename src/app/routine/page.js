// "use client";
// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   PDFViewer,
// } from "@react-pdf/renderer";
// import { orange } from "@mui/material/colors";
// import { routines } from "../../../fake_routine";
// import _ from "lodash";

// const routine = routines[0];
// console.log(_.zip(...Object.values(_.groupBy(routine.periods, "day"))));
// // Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "column",
//     // alignItems: "flex-start",
//     backgroundColor: orange[50],
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//   },
//   table_container: {
//     margin: 10,
//     padding: 10,
//   },
//   thead: {
//     flexDirection: "row",
//     // justifyContent: "space-around",
//     // backgroundColor: "red",
//     border: "1px solid #111",
//     padding: 10,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   thead_text: {
//     fontSize: 10,
//   },
//   tbody: {
//     border: "1px solid #111",
//     borderTop: 0,
//     padding: 10,
//     flexDirection: "row",
//   },
//   lastItem: {
//     borderBottomLeftRadius: 10,
//     borderBottomRightRadius: 10,
//   },
//   table_cell: {
//     flex: 1,
//   },
// });

// // Create Document Component
// const MyDocument = ({ routines }) => (
//   <Document>
//     {routines?.map((routine) => (
//       <Page size="A4" orientation="landscape" style={styles.page}>
//         <View style={styles.section}>
//           <Text>Routine for Class - {routine.standard}</Text>
//         </View>
//         <View style={styles.table_container}>
//           <View style={styles.thead}>
//             {["Periods", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
//               (day) => (
//                 <View style={styles.table_cell}>
//                   <Text style={styles.thead_text}>{day}</Text>
//                 </View>
//               )
//             )}
//           </View>
//           <View>
//             {_.zip(...Object.values(_.groupBy(routine.periods, "day"))).map(
//               (arr, index) => (
//                 <View
//                   style={[styles.tbody, index == 7 ? styles.lastItem : null]}
//                 >
//                   <View style={styles.table_cell}>
//                     <Text style={{ fontSize: 10 }}>{index + 1} period</Text>
//                   </View>
//                   {arr.map((item, index, a) => (
//                     <View style={styles.table_cell}>
//                       <Text style={{ fontSize: 10 }}>{item.subject}</Text>
//                     </View>
//                   ))}
//                 </View>
//               )
//             )}
//           </View>
//         </View>
//       </Page>
//     ))}
//   </Document>
// );
// const Routine = () => {
//   return (
//     <div>
//       <PDFViewer width={"100%"} height="850px">
//         <MyDocument routines={routines} />
//       </PDFViewer>
//     </div>
//   );
// };

// export default Routine;
