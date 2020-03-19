# mockline

This is a mock applications built on nestjs. It is going to provide the ability to mock data with an on going time sequnce(Due to my own needs to mock data various in a predictable range of values)

This app is still under programming and not ready for widely publish. But it's yet some kind of functional(With few types of data sequence and some UI dashboard). Feel free to download and test it.

- Mock
- Dynamical Datas
- JSON formatted
- Easy to launch

## When should you use this application?

If you are a Web programmer handling with datas varies with time or your requesting them, and you want a mock application which could mock datas like those above. Then you may could give a try on this app :)

Your testing and issues will support me a lot, thank you!

## Table of Content

- Fundamentals
- Current Progress
- Install and Launch
- Usage

---

## Fundamentals

To make it easy to communicate, there is some conception to define first.

### Sequence

As I mentioned above, requests to this mocker will get a sequence of sets of data one by one. So, a Sequence stand for a set of configs defining **how** and **when** and **what** data should be returned.

And every one Sequence should get mapped to a certain JSON file.

## Current Progress

- [x] Ordered Sequence with no time related fators, datas get returned one by one.
- [x] Time Sequence with time related fators, datas get returned one by one with a certain time period passed.
- [x] User friendly UI dashboard.
- [ ] Sequence instance status monitor.
- [ ] Refactory the method to store Sequences.
- [ ] Full test case.
- [ ] A more easy way to launch, maybe pack into electron?

## Install and Launh

This app is based on Nest.JS, so you need Node.js to launch it.

```sh
# cd to the project

npm install
npm run start

# or
yarn install
yarn start
```

And there is a problem is that currently you have to restart the app to apply any mock data changes. (But this will be soon fixed after the UI comes out)

## Usage

### UI Dashboard

Now we have a simple usable UI dashboard to manage Sequences.

Open brower and go to `http://127.0.0.1:3000`. There should be a redirect to the dashboard.

Just be sure to select a sequence type and contains at least ONE data before save.

More user friendly features will be added in the future.

### Create by code

To create a mock data manually:

1. Create a JSON file under the `PROJECT_ROOT/data/api` directory. Requests to the mock server will be mapped to the folder path. For example

```
GET 127.0.0.1:3000/api/some/request

# will get mapped to

data/api/some/request.json
```

2. Edit JSON file

JSON file define how the mock behavior.

```json
{
  "datas": [
    {
      "value": 1
    },
    {
      "value": 2
    }
  ],
  "type": "ORDER_SEQUENCE",
  "option": {
    "infinite": true
  }
}
```

- `datas`, `any[]` define the datas, must be an Array and order is important.
- `type`, define which type the sequence is.
- `option`, options for the sequence.

Currently, the app only implemented **2 types** of sequence - TimeSequence and OrderSequence.
