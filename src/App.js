import React, { Component } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts'
import styled from 'styled-components'

class NutritionInfo extends Component {

  render() {
    var food0name = this.props.inputs[0].name.charAt(0).toUpperCase() + this.props.inputs[0].name.slice(1)
    var food1name = this.props.inputs[1].name.charAt(0).toUpperCase() + this.props.inputs[1].name.slice(1)
    const pieOptions = {
      pieHole: 0.6,
      slices: [
        { color: "#E3CA4D" },
        { color: "#B85673" },
      ],
      legend: {
        position: "bottom",
        alignment: "center",
        textStyle: {
          color: "233238",
          fontSize: 14
        }
      },
      chartArea: {
        left: 0,
        top: 0,
        width: "100%",
        height: "80%"
      },
      fontName: "Arial"
    };

    return (
      <NutritionWrapper>
        <Left>
          <Bold2>{food0name} Nutrition Info</Bold2>
          <p> Calories: {this.props.inputs[0].calories} </p>
          <p> Serving Size: {this.props.inputs[0].servingSize} </p>
          <p> Serving Unit: {this.props.inputs[0].servingUnit} </p>
          <FlexRow>
            <Button2 onClick={this.props.handleToggleNewImage0}>New {food0name} Image</Button2>
          </FlexRow>
          <Image key={this.props.toggleNewImage0} src={'https://source.unsplash.com/600x500/?' + this.props.inputs[0].name + '&ignore=' + this.props.toggleNewImage0} />
          <br></br>
          <Bold2>% Daily Calories</Bold2>
          <FlexRow>
            <Chart
              chartType="PieChart"
              data={[["Food", "Overall Calories"], [food0name, this.props.inputs[0].calories], ["Remaining Calories *", 2500 - this.props.inputs[0].calories]]}
              width={"60vh"}
              height={"60vh"}
              options={pieOptions}
            />
          </FlexRow>
          * Based on 2,500 Daily Calories
        </Left>
        <Right>
          <Bold2>{food1name} Nutrition Info</Bold2>
          <p> Calories: {this.props.inputs[1].calories} </p>
          <p> Serving Size: {this.props.inputs[1].servingSize} </p>
          <p> Serving Unit: {this.props.inputs[1].servingUnit} </p>
          <FlexRow>
            <Button2 onClick={this.props.handleToggleNewImage1}>New {food1name} Image</Button2>
          </FlexRow>
          <Image key={this.props.toggleNewImage1} src={'https://source.unsplash.com/600x500/?' + this.props.inputs[1].name + '&ignore=' + this.props.toggleNewImage1} />
          <br></br>
          <Bold2>% Daily Calories</Bold2>
          <FlexRow>
            <Chart
              chartType="PieChart"
              data={[["Food", "Overall Calories"], [food1name, this.props.inputs[1].calories], ["Remaining Calories *", 2500 - this.props.inputs[0].calories]]}
              width={"60vh"}
              height={"60vh"}
              options={pieOptions}
            />
          </FlexRow>
          * Based on 2,500 Daily Calories
        </Right>
      </NutritionWrapper>
    )
  }
}

class Result extends Component {

  renderResult() {
    var food1cal = parseFloat(this.props.inputs[0].calories);
    var food2cal = parseFloat(this.props.inputs[1].calories);
    var higher = Math.max(food1cal, food2cal)
    var lower = Math.min(food1cal, food2cal)
    var result = Math.floor(higher / lower)

    // checking if serving unit matches name
    if (this.props.inputs[0].servingUnit == this.props.inputs[0].name) {
      var output0result = (result * this.props.inputs[0].servingSize) + ' ' + this.props.inputs[0].name
    }
    else {
      var output0result = this.props.inputs[0].servingSize + ' ' + this.props.inputs[0].servingUnit + ' of ' + this.props.inputs[0].name
    }

    if (this.props.inputs[1].servingUnit == this.props.inputs[1].name) {
      var output1result = result * this.props.inputs[1].servingSize + ' ' + this.props.inputs[1].name
    }
    else {
      var output1result = result * this.props.inputs[1].servingSize + ' ' + this.props.inputs[1].servingUnit + ' of ' + this.props.inputs[1].name
    }


    if (this.props.inputs[0].servingUnit == this.props.inputs[0].name) {
      var output0 = this.props.inputs[0].servingSize + ' ' + this.props.inputs[0].name
    }
    else {
      var output0 = this.props.inputs[0].servingSize + ' ' + this.props.inputs[0].servingUnit + ' of ' + this.props.inputs[0].name
    }

    if (this.props.inputs[1].servingUnit == this.props.inputs[1].name) {
      var output1 = this.props.inputs[1].servingSize + ' ' + this.props.inputs[1].name
    }
    else {
      var output1 = this.props.inputs[1].servingSize + ' ' + this.props.inputs[1].servingUnit + ' of ' + this.props.inputs[1].name
    }


    if (this.props.inputs[0].servingUnit == this.props.inputs[0].name) {
      var output0pluralresult = result * this.props.inputs[0].servingSize + ' ' + this.props.inputs[0].name + 's'
    }
    else {
      var output0pluralresult = result * this.props.inputs[0].servingSize + ' ' + this.props.inputs[0].servingUnit + 's of ' + this.props.inputs[0].name
    }

    if (this.props.inputs[1].servingUnit == this.props.inputs[1].name) {
      var output1pluralresult = result * this.props.inputs[1].servingSize + ' ' + this.props.inputs[1].name + 's'
    }
    else {
      var output1pluralresult = result * this.props.inputs[1].servingSize + ' ' + this.props.inputs[1].servingUnit + 's of ' + this.props.inputs[1].name
    }


    // if second food is higher, return second food first
    if (this.props.inputs[0].calories > this.props.inputs[1].calories) {
      //checking if plural
      if ((result * this.props.inputs[1].servingSize) > 1) {
        return (
          <div>
            <Card>
              You can eat <Bold>{output1pluralresult}</Bold> per every <Bold>{output0}</Bold>
            </Card>
            <NutritionInfo
              inputs={this.props.inputs}
              toggleNewImage0={this.props.toggleNewImage0}
              handleToggleNewImage0={this.props.handleToggleNewImage0}
              toggleNewImage1={this.props.toggleNewImage1}
              handleToggleNewImage1={this.props.handleToggleNewImage1}
            />
          </div>
        )
      }
      else {
        return (
          <div>
            <Card>
              You can eat <Bold>{output1result}</Bold> per every <Bold>{output0}</Bold>
            </Card>
            <NutritionInfo
              inputs={this.props.inputs}
              toggleNewImage0={this.props.toggleNewImage0}
              handleToggleNewImage0={this.props.handleToggleNewImage0}
              toggleNewImage1={this.props.toggleNewImage1}
              handleToggleNewImage1={this.props.handleToggleNewImage1}
            />
          </div>
        )
      }
    }

    // if first food is higher, return first food first
    if (this.props.inputs[1].calories > this.props.inputs[0].calories) {
      //checking if plural
      if ((result * this.props.inputs[0].servingSize) > 1) {
        return (
          <div>
            <Card>
              You can eat <Bold>{output0pluralresult}</Bold> per every <Bold>{output1}</Bold>
            </Card>
            <NutritionInfo
              inputs={this.props.inputs}
              toggleNewImage0={this.props.toggleNewImage0}
              handleToggleNewImage0={this.props.handleToggleNewImage0}
              toggleNewImage1={this.props.toggleNewImage1}
              handleToggleNewImage1={this.props.handleToggleNewImage1}
            />
          </div>
        )
      }
      else {
        return (
          <div>
            <Card>
              You can eat <Bold>{output0result}</Bold> per every <Bold>{output1}</Bold>
            </Card>
            <NutritionInfo
              inputs={this.props.inputs}
              toggleNewImage0={this.props.toggleNewImage0}
              handleToggleNewImage0={this.props.handleToggleNewImage0}
              toggleNewImage1={this.props.toggleNewImage1}
              handleToggleNewImage1={this.props.handleToggleNewImage1}
            />
          </div>
        )
      }
    }
  }


  render() {
    return (
      <div>
        {this.props.toggleResult === true ? this.renderResult() : null}
      </div>
    )
  }
}


class InputOptions extends Component {

  render() {
    return (
      this.props.inputs.map((e, i) => {
        return (
          <div key={i}>
            <Label>{e.label} </Label>
            <Input name={e.label} placeholder={e.label} onChange={this.props.handleInputChange} />
          </div>
        )
      })
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: [
        {
          label: 'Food 1',
          name: '',
          calories: [],
          servingSize: [],
          servingUnit: [],
        },
        {
          label: 'Food 2',
          name: '',
          calories: [],
          servingSize: [],
          servingUnit: [],
        },
      ],
      toggleResult: false,
      toggleNewImage0: new Date().toISOString(),
      toggleNewImage1: new Date().toISOString(),
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleToggleNewImage0 = this.handleToggleNewImage0.bind(this)
    this.handleToggleNewImage1 = this.handleToggleNewImage1.bind(this)
  }

  handleToggleNewImage0() {
    this.setState({
      toggleNewImage0: new Date().toISOString(),
    })
  }

  handleToggleNewImage1() {
    this.setState({
      toggleNewImage1: new Date().toISOString(),
    })
  }

  handleInputChange(e) {
    var copyInputs = this.state.inputs.slice()
    var index = copyInputs.findIndex(obj => obj.label.includes(e.target.name))
    var updatedInput = {
      label: e.target.name,
      name: e.target.value,
      calories: [],
      servingSize: [],
      servingUnit: [],
    }
    copyInputs.splice(index, 1, updatedInput)

    this.setState({
      inputs: copyInputs,
    })
  }


  handleClick() {
    axios({
      method: 'get',
      url: 'https://nutritionix-api.p.mashape.com/v1_1/search/' + this.state.inputs[0].name + '?fields=nf_calories%2Cnf_serving_size_qty%2Cnf_serving_size_unit',
      headers: { 'X-Mashape-Key': process.env.REACT_APP_KEY },
    })
      .then(response => {
        var dataCalories = response.data.hits[0].fields.nf_calories
        var dataServingSize = response.data.hits[0].fields.nf_serving_size_qty
        var dataServingUnit = response.data.hits[0].fields.nf_serving_size_unit
        var copyInputs = this.state.inputs.slice()
        var updatedInput = {
          label: copyInputs[0].label,
          name: copyInputs[0].name,
          calories: dataCalories,
          servingSize: dataServingSize,
          servingUnit: dataServingUnit,
        }
        copyInputs.splice(0, 1, updatedInput)

        this.setState({
          inputs: copyInputs,
        })
      }
      );

    axios({
      method: 'get',
      url: 'https://nutritionix-api.p.mashape.com/v1_1/search/' + this.state.inputs[1].name + '?fields=nf_calories%2Cnf_serving_size_qty%2Cnf_serving_size_unit',
      headers: { 'X-Mashape-Key': process.env.REACT_APP_KEY },
    })
      .then(response => {
        var dataCalories = response.data.hits[0].fields.nf_calories
        var dataServingSize = response.data.hits[0].fields.nf_serving_size_qty
        var dataServingUnit = response.data.hits[0].fields.nf_serving_size_unit
        var copyInputs = this.state.inputs.slice()
        var updatedInput = {
          label: copyInputs[1].label,
          name: copyInputs[1].name,
          calories: dataCalories,
          servingSize: dataServingSize,
          servingUnit: dataServingUnit,
        }
        copyInputs.splice(1, 1, updatedInput)

        this.setState({
          inputs: copyInputs,
        })
      }
      );

    this.setState({
      toggleResult: true
    })
  }


  render() {
    return (
      <Wrapper>
        <Title>
          Food Faceoff
        </Title>
        <p>
          Compare how much of one food you can eat versus another
          </p>
        <InputOptions
          inputs={this.state.inputs}
          handleInputChange={this.handleInputChange}
        />
        <Button onClick={this.handleClick}>Submit</Button>
        <Result
          inputs={this.state.inputs}
          toggleResult={this.state.toggleResult}
          toggleNewImage0={this.state.toggleNewImage0}
          handleToggleNewImage0={this.handleToggleNewImage0}
          toggleNewImage1={this.state.toggleNewImage1}
          handleToggleNewImage1={this.handleToggleNewImage1}
        />
      </Wrapper>
    );
  }
}

// Styling from styled components

const Title = styled.h1`
  font-size: 5em;
  text-align: center;
  color: palevioletred;
`
const Input = styled.input`
  font-size: 1em;
  padding: 1vh;
  margin: .5vh;
  width: 20%
`

const Label = styled.label`
  font-size: 1em;
  font-weight: bold;
`

const Wrapper = styled.section`
  padding: 8em;
  font-family: 'Krub', sans-serif;
  text-align: center;
  font-size: 1em;
`;

const Button = styled.button`
  background-color: palevioletred;
  color: white;
  border-style: groove;
  border-radius: 10%;
  border: 2px solid white;
  font-size: 1em;
  padding: 10px 20px;
  margin: 1em;
    :hover {
      color: palevioletred;
      background-color: white;
      border: 2px solid palevioletred;
    }
`

const Button2 = styled.button`
  background-color: #A9A9A9;
  color: white;
  border-style: groove;
  border-radius: 10%;
  border: 2px solid white;
  font-size: 1em;
  padding: 10px 20px;
  width: 30vw;
  margin: 1em;
    :hover {
      color: #A9A9A9;
      background-color: white;
      border: 2px solid #A9A9A9;
    }
`

const Card = styled.section`
  border: 2px solid palevioletred;
  font-size: 1em;
  height: 10vw;
  text-align: center;
  padding: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-style: groove;
  border-radius: 5%;
  margin: 4vw 0 1vw 0;
`
const Bold = styled.section`
  font-weight: bold;
  font-size: 3em;
  color: palevioletred;
`

const Bold2 = styled.section`
  font-weight: bold;
  font-size: 2em;
  color: #B85673;
  padding: 1em;
`

const NutritionWrapper = styled.section`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-areas: 
    'left right'
`

const Left = styled.section`
  grid-area: left;
  margin: 2em 1em 2em 0;
  border: 1px solid #A9A9A9;
  border-style: groove;
  border-radius: 5%;
  padding: 1vh;
`

const Right = styled.section`
  grid-area: right;
  margin: 2em 0 2em 1em;
  border: 1px solid #A9A9A9;
  border-style: groove;
  border-radius: 5%;
  padding: 1vh;
`
const Image = styled.img`
  height: 50vh;
`

const FlexRow = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 2em;
`

export default App;
