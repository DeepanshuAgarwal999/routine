"use client";
import { Button, Container } from "@mui/material";
import Classcard from "./components/class-card";
import { Form, FieldArray, FieldArrayItem } from "houseform";
import { useRef } from "react";
import { Stack } from "@mui/system";
import { routines } from "../../fake_routine";
import { orange } from "@mui/material/colors";
import _, { transform } from "lodash";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  pdf,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    // alignItems: "flex-start",
    backgroundColor: orange[50],
  },
  section: {
    margin: 10,
    padding: 10,
  },
  table_container: {
    margin: 10,
    padding: 10,
  },
  thead: {
    flexDirection: "row",
    // justifyContent: "space-around",
    // backgroundColor: "red",
    border: "1px solid #111",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  thead_text: {
    fontSize: 10,
  },
  tbody: {
    border: "1px solid #111",
    borderTop: 0,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  lastItem: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  table_cell: {
    flex: 1,
    textAlign: "center",
  },
});

// Create Document Component
const MyDocument = ({ routines }) => (
  <Document>
    {routines?.map((routine) => (
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.section}>
          <Text>Routine for Class - {routine.standard}</Text>
        </View>
        <View style={styles.table_container}>
          <View style={styles.thead}>
            {["Periods", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
              (day) => (
                <View style={styles.table_cell}>
                  <Text style={styles.thead_text}>{day}</Text>
                </View>
              )
            )}
          </View>
          <View>
            {_.zip(...Object.values(_.groupBy(routine.periods, "day"))).map(
              (arr, index) => (
                <View
                  style={[styles.tbody, index == 7 ? styles.lastItem : null]}
                >
                  <View style={styles.table_cell}>
                    <Text style={{ fontSize: 10 }}>{index + 1} period</Text>
                  </View>
                  {arr.map((item, index, a) => (
                    <View style={styles.table_cell}>
                      <Text style={{ fontSize: 10 }}>{item.subject}</Text>
                      <Text style={{ fontSize: 8 }}>({item.teacher})</Text>
                    </View>
                  ))}
                </View>
              )
            )}
          </View>
        </View>
      </Page>
    ))}
  </Document>
);

export default function Home() {
  const formArrayRef = useRef(null);
  // console.log(formArrayRef.current);
  const addStandard = () => {
    formArrayRef.current.add({ standard: "", periods: [] });
  };

  return (
    <div>
      <Container sx={{ py: 4, width: "full" }} component={"main"}>
        <Button variant="contained" onClick={addStandard}>
          Add a new class
        </Button>
        <Form
          onSubmit={async (values) => {
            // console.log("submitted" + JSON.stringify(values));
            const doc = <MyDocument routines={values.routine}></MyDocument>;
            const asPdf = pdf([]);
            asPdf.updateContainer(doc);
            const blob = await asPdf.toBlob();
            saveAs(blob, "routine.pdf");
          }}
        >
          {({ submit }) => (
            <Stack
              spacing={4}
              component={"form"}
              mt={6}
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <FieldArray
                ref={formArrayRef}
                name="routine"
                initialValue={[
                  // {
                  //   standard: "",
                  //   periods: [
                  //     // { number: "", subject: "", teacher: "" }
                  //   ],
                  // },
                  ...routines,
                ]}
              >
                {({ value, remove }) => (
                  <>
                    {value.map((routine, i) => (
                      <Classcard
                        key={`routine-${i}`}
                        index={i}
                        remove={() => remove(i)}
                        routine={routine}
                      />
                    ))}
                  </>
                )}
              </FieldArray>
              <Button
                type="submit"
                variant="contained"
                sx={{ width: 200,position:"relative",left:"50%", transform:"translateX(-50%)"}}
                color="success"
               
              >
                Submit
              </Button>
            </Stack>
          )}
        </Form>
      </Container>
    </div>
  );
}
