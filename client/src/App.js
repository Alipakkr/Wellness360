import "./App.css";
import { useState, useEffect } from "react";
import ChatMessage from "./components/ChatMessage";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Header from "./components/Header";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Loading from "./components/Loading";
import FormDialog from "./components/FormDialog";
import ChoicesDialog from "./components/ChoicesDialog";
import Typography from "@mui/material/Typography";
import Footer from "./components/Footer";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [workout, setWorkout] = useState([]);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [notSay, setNotSay] = useState(false);
  const [askGPT, setAskGPT] = useState(false);
  const [receivedData, setReceivedData] = useState(false);
  const [goalchoice, setGoalChoice] = useState("");
  const [genderChoice, setGenderChoice] = useState("");
  const [workoutSelected, selectWorkout] = useState(false);
  const [formFilled, setFormFilled] = useState(false);

  const PORT = 3080;

  function clearChatLog() {
    setChatLog([]);
    setWorkout([]);
    setReceivedData(false);
    window.location.reload();
  }

  //   function selectchoice(selection) {
  //     if (!workout.includes(String(selection))) {
  //       console.log("includes ", workout, selection);
  //       setWorkout([...workout, selection]);
  //     } else {
  //       setWorkout(workout.filter((current) => current !== selection));
  //     }
  //     selectWorkout(false);
  //   }

  async function submit() {
    setReceivedData(false);
    setAskGPT((askGPT) => !askGPT);
    let string = "";
    if (workout.length > 1) {
      string = workout[0];
      for (let i = 1; i < workout.length; i++) {
        string = string + " and " + workout[i];
      }
    } else {
      string = workout[0];
    }
    // let chatLogNew = `Give me a", ${string}, "workout`;
    // let chatLogNew = `Give me a ${string} workout with sets and reps in 4 exercises under 90 minutes for women`;
    let chatLogNew;
    // console.log(height, weight, notSay, goalchoice, genderChoice, formFilled);
    if (notSay || !formFilled) {
      chatLogNew = `Give me a ${string} workout with sets and reps in 4 exercises.`;
    } else {
      chatLogNew = `Give me a ${string} workout with sets and reps in 4 exercises
         then calculate the calories needed for a ${genderChoice} who is ${height} centimeters tall 
         and weighs ${weight} kilograms to ${goalchoice}`;
    }
    // console.log(chatLogNew); // used for error checking and see if the string is built correctly
    const messages = chatLogNew;
    // console.log(`http://localhost:${PORT}/`);
    const response = await fetch(`http://localhost:3080/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        // currentModel,
      }),
    }).catch((error) => {
      throw error;
    });
    const data = await response.json();
    console.log(data);
    chatLogNew = "";
    // console.log(data); use this to check feedback from chatGPT
    let message = data.msgs.slice(2);
    console.log(message);
    // setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    setChatLog([...chatLogNew, { user: "gpt", message: `${message}` }]);
    setAskGPT((askGPT) => !askGPT);
    setReceivedData(true);
  }

  const addMeasurements = (formReturn) => {
    if (formReturn.notSay) {
      //   console.log("Prefer not to say");
      setNotSay(true);
    } else {
      setHeight(formReturn.centimeters);
      setWeight(formReturn.currentWeight);
    }
    // console.log(
    //   formReturn.centimeters,
    //   formReturn.currentWeight,
    //   formReturn.notSay
    // );
    setFormFilled(true);

    // submit(formReturn.centimeters, formReturn.currentWeight, formReturn.notSay);
  };

  const onChoose = (goal) => {
    setGoalChoice(goal);
    // console.log(goal);
  };

  const chooseGender = (gender) => {
    setGenderChoice(gender);
    // console.log(gender);
  };

  const newPlan = () => {
    setHeight(0);
    setWeight(0);
    setNotSay(false);
    clearChatLog();
  };

  const selectchoiceTesting = (event) => {
    setWorkout(event);
  };

  return (
    <div className="App">
      <div className="chatbox">
        <div className="header" >
          <Header />
        </div>
        <div className="choices">
          <ChoicesDialog onSelect={selectchoiceTesting} />
          <FormDialog
            onAdd={addMeasurements}
            newplan={clearChatLog}
            onChoose={onChoose}
            onChooseGender={chooseGender}
            generate={submit}
          />
        </div>
        <div className="submit-buttons">
          <Stack
            // display="inline-block"
            display="flex"
            direction="row"
            marginTop={2}
            spacing={2}
            bottom={0}
            left={0}
            right={0}
            width="100%"
            justifyContent="space-evenly"
            position="relative"
          >
            <Button
              style={{ minWidth: 160, backgroundColor: "#ff6f00"}}
              variant="contained"
              onClick={newPlan}
            >
              Refresh
            </Button>
            <Button
              style={{ minWidth: 160, backgroundColor: "#ff6f00" }}
              variant="contained"
              onClick={submit}
            >
              Generate Plan
            </Button>
          </Stack>
        </div>
        <Box
          className="chat-log-box"
          display="flex"
          justifyContent={"center"}
          margin="0 auto"
        >
          <div className="chat-log">
            {/* {askGPT && <text>AI is generating plan</text>} */}
            {receivedData && (
              <Box display="flex" justifyContent={"center"}>
                <Paper
                  className="loading"
                  variant="outlined"
                  sx={{
                    backgroundColor: "#1976d2",
                    color: "white",
                    textAlign: "center",
                    height: "40px",
                  }}
                >
                  <Typography variant="h5">AI Personalized plan</Typography>
                </Paper>
              </Box>
            )}
            {askGPT ? (
              <Loading />
            ) : (
              <>
                {chatLog.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
              </>
            )}
          </div>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

export default App;