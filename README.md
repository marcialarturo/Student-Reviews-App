# Submission

### Project Name:`Student Reviews App`

<br/>

![HomePage](https://raw.githubusercontent.com/marcialarturo/Student-Reviews-App/main/preview.png)

# Project Description:

Student Reviews App is an educational site where students evaluate, rate, and review teachers and courses. It allows users to send and receive stream payments and donations.

Students can learn and read more about classes before they commit or register. This will help students save thousands of dollars and time.

Furthermore, students can share class notes, labs, terms reviews, and more. Class notes creators can get tips from sharing their notes and students can add a new class that doesn’t exist on the app or rate one that already exists for a chance of winning NFTs.

Users can search for teachers by name or choose a department and rate its teachers or read reviews left by other students. The rating system allows you to assign one to five stars to your teachers within the following categories:

- Effective
- Integrity
- Empathy
- Respect
- Determination
- Homework

If you have ever attended a class taught by a difficult teacher, you know that his personality and skills can impact your school performance. But, by doing some research, you can set yourself up for success and increase your odds of getting a good grade before you ever start.

In the future, we would like to add functionality for these NFTs to be used as a credit to take a class for free and more ways for students to work together. As well as chat functionality for the class to communicate with other students and the instructor.

<br/>

# How Student Reviews App uses IPFS

Student Reviews App uses IPFS NFTStorage to store Professors’ names, job positions, and professors' past performance. IPFS is also used to store class NFTs, names, class details, class events, and class materials and notes. For reviews, IPFS saves all the reviews, tags, class difficulty, class quality, and ratings in a decentralized way.

For every single endpoint, we return an NFTStorage hash that gets appended to the next IPFS object and it is saved on the smart contract. Then we populate our front end by calling our contract that returns all IPFS cids, and all data needed.

IPFS makes our app a fully decentralized app with an immutable chain of events that allows public and accessible data to the masses.

Example links:

- Class Materials Feature

  - Post New Material <br/>
    https://github.com/marcialarturo/Student-Reviews-App/blob/61359ce28f776de0d3184ca5a5bc1d280c3acbf1/AddMaterials.js#L44

  - Get All Class Materials <br/>
    https://github.com/marcialarturo/Student-Reviews-App/blob/91cc4f6def6b24bfd198dcf1ac1272d1a5fdcb9c/Profile.js#L93

- Professors and Classes Feature
  - Post New Class <br/>
    https://github.com/marcialarturo/Student-Reviews-App/blob/e9248d5b706981663414d486b1ed32d353733994/create-profile/CreateProfile.js#L47

* Get All Classes <br/>
  https://github.com/marcialarturo/Student-Reviews-App/blob/e3a7bcddec53343923b8289aa2aaf3a0ac3c85ab/App.js#L73

* Reviews Feature

  - Post New Review<br/>
    https://github.com/marcialarturo/Student-Reviews-App/blob/36bf31d2b55101d0e4c746b8b7974d515c9c423e/PostComment.js#L53

  - Get All Reviews <br/>
    https://github.com/marcialarturo/Student-Reviews-App/blob/91cc4f6def6b24bfd198dcf1ac1272d1a5fdcb9c/Profile.js#L137
    <br/><br/>

# Link to the publicly visible source code repository

https://github.com/marcialarturo/Student-Reviews-App<br/><br/>

# Live Demo

https://student-reviews.netlify.app/#/

# Video Link

https://youtu.be/B-kZtggch-0

# Teamncontact info:

Izmar, metaversemoon@gmail.com
<br/><br/>

# How It's Made

This app makes use of the following software:

- `Polygon Network` enables our application to be a scalable and secure platform with light-speed transactions. We have successfully deployed to the Polygon Test Network at contract address:`0xB61B5Ff6930EB40734d480C4e0b5312702673ED0`

- `Skale Network` enables our application to be a scalable and secure platform with light-speed transactions. We have successfully deployed to the Skale Network at contract address: `0x15036E33e8E8f706fd77A1aC550d28FD58432c1B`

- `IPFS NFTStorage`facilitated the storage of NFTS, details of the class, and metadata of every event class. We are also, saving all the reviews, tags, class difficulty, class quality, and ratings.

* `SuperFluid` enables stream payment for donations and rewards for our application

* `WorldCoin` makes sure users create only one event for a class per person to avoid any scams.

* `Xmtp` allows donators to chat with organizers and members of the groups.

* `Livepeer` facilitated the process of meeting other students from a specific class and questions about lectures.

* `Ethereum Name Service (ENS)` allows donators to look up Ethereum Name Service and convert them to wallet addresses.

- `NFTPort` smooths the path of the minting and donating process and eliminates the high transaction fees. Our users will not pay anything for donating NFTs or minting.
- `Solidity` for the smart contract.
- `OpenZeppelin ERC721` we use the ERC721 template for faster development of our smart contract.
- `Hardhat` for local blockchain development.
- `React Js, Material-ui, Web3` React Js for the frontend, Material-ui, and Web3 to connect to the blockchain.

- `Mumbai Polygon Network` enables our application to be a scalable platform with fast transactions. We deployed our app on the Mumbai Network. Contract Address: `0x2DD669b696Eb8B9D13151517ffb1acCBc88dCFC8`
  <br/><br/>

# Deployed Address

Contract Deployed Matic: 0x2DD669b696Eb8B9D13151517ffb1acCBc88dCFC8
Contract Deployed Skale: 0x15036E33e8E8f706fd77A1aC550d28FD58432c1B
