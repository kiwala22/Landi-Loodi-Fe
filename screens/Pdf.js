import * as Print from "expo-print";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";

const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }

            h1 {
                text-align: center;
            }

            p {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Landi Loodi Receipt</h1>

        <p>This is a printer test functionality</p>
    </body>
    </html>
`;

const Separator = () => <View style={styles.separator} />;

export default function Pdf() {
  const generatePdf = async () => {
    const pdf = await Print.printAsync({ html: htmlContent });

    return pdf;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>
          This is the PDF generation functionality.
        </Text>
        <Button title="Generate PDF" onPress={() => generatePdf()} />
      </View>
      <Separator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    // backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
