import { useState, useEffect, useContext } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { createTheme, ThemeProvider } from "@mui/material";
import { DataContext } from "../../context/DataContext";
import Loader from "../Loader";
import styled from "@emotion/styled";

const Container = styled.div`
  max-width: 1292px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 25px;
  padding: 40px;
`;

function Chart({ id, hours }) {
  const [type, setType] = useContext(DataContext);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#ffffff",
      },
      mode: "dark",
    },
  });

  async function getData() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${type}&days=${
          hours / 24
        }`
      );
      const data = await response.json();
      setProduct(data.prices);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [hours, type]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {!product || loading ? (
          <Loader />
        ) : (
          <Line
            data={{
              labels: product.map((item) => {
                let date = new Date(item[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                    : `${date.getHours()} : ${date.getMinutes()}AM`;
                return hours <= 24 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: product.map((item) => item[1]),
                  label: `Price (Past ${hours} Hours) in ${type}`,
                  borderColor: "skyblue",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default Chart;
