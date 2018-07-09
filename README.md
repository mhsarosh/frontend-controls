# Frontend Controls

## 1. Multi Text Input Control
A basic text input to provide multiple values

### Example
```
  <!--Div to hold multitext input-->
  <!--Attributes to be applied at input element are to be prefixed with "mi-"-->
  <div class="multitext-input" mi-type="number" mi-class="custom-class">
        
    <!--text input to hold comma separated values-->
    <input class="multitext-input-values" name="nameForValueInForm" type="hidden" value="">
  </div>
```
```
  <link rel="stylesheet" href="multitextinput.css">
  <script src="multitextinput.js"></script>
```

##### multitext-input
  Div element with class attribute **multitext-input** is initialized as a **MultiTextInput** control

##### "mi-" attributes
  Attributes applied to **multitext-input** div with **mi-** prefix will be applied to the visible input control

##### multitext-input-values
  Input control, within the **multitext-input** div, with class attribute **multitext-input-values** provides entered values, separated by comma


### Dependencies
  <ul>
    <li>Bootstrap</li>
    <li>jQuery</li>
  </ul>
