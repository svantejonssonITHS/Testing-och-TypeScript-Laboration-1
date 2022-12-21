[← Go back](../README.md)

# Base setup

## 1. Clone the git repository

First, make sure that you have git installed on your machine. If you do not have git, you can download and install it from the [official website](https://git-scm.com/). Then you can use the following command to clone the repository:

```sh
git clone https://github.com/[username]/[repository].git
```

## 2. Navigate to the repo on your machine

In the terminal from the last step use the cd command to navigate to the directory where you cloned the repository. For example:

```sh
cd path/to/repository
```

## 3. Install all needed npm dependencies

First, make sure that you have node and npm installed on your machine. If you do not have node and npm, you can download and install them from the [official website](https://nodejs.org/). Then you can use the following command to install all needed npm dependencies:

```sh
npm install
```

This command will install all of the dependencies listed in the `package.json` files in the repository.

## 4. Setup an Auth0 tenant

Instructions for setting up an Auth0 tenant can be found [here](./BASE_AUTH0.md).
