import { Text, Image } from "react-native";
import Container from "./components/Container";
import { LOGO } from "./image";

const Home = () => {
  return (
    <>
      <Image
        resizeMode="cover"
        alt="logo"
        source={LOGO}
        style={{
          height: 110,
          width: "100%",
        }}
      />
      <Container>
        <Text
          style={{
            textAlign: "left",
            color: "#000",
            fontSize: 22,
            padding: 20,
          }}
        >
          This is an app for sharing or donating items, the idea is that we
          reuse things and don´t have to buy them all the time. That way, we can
          fight capitalism a little bit
        </Text>
      </Container>

      <Container>
        <Text
          style={{
            textAlign: "left",
            color: "#000",
            fontSize: 20,
            padding: 20,
          }}
        >
          This would be a widget with recently seen items
        </Text>
      </Container>

      <Container>
        <Text
          style={{
            textAlign: "left",
            color: "#000",
            fontSize: 20,
            padding: 20,
          }}
        >
          This would be a widget with recently uploaded items
        </Text>
      </Container>
    </>
  );
};

export default Home;
