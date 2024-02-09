---
title: "Center the div"
author: "Mustafa"
date: "02/02/2024"
---

1. Using Flexbox:

```
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .flex-center {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }

    .centered-div {
      width: 300px;
      height: 200px;
      background-color: #eee;
      border: 1px solid #ccc;
      text-align: center;
      padding: 20px;
    }
  </style>
</head>
<body class="flex-center">
  <div class="centered-div">
    <h2>Centered with Flexbox</h2>
  </div>
</body>
</html>
```

2. Using Grid:

```
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .grid-center {
      display: grid;
      place-items: center;
      height: 100vh;
    }

    .centered-div {
      width: 300px;
      height: 200px;
      background-color: #eee;
      border: 1px solid #ccc;
      text-align: center;
      padding: 20px;
    }
  </style>
</head>
<body class="grid-center">
  <div class="centered-div">
    <h2>Centered with Grid</h2>
  </div>
</body>
</html>
```
3. Using Absolute Position:

```
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    .absolute-center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    .centered-div {
      width: 300px;
      height: 200px;
      background-color: #eee;
      border: 1px solid #ccc;
      text-align: center;
      padding: 20px;
    }
  </style>
</head>
<body>
  <div class="absolute-center centered-div">
    <h2>Centered with Absolute Position</h2>
  </div>
</body>
</html
```
