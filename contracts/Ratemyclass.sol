// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Ratemyclass is ERC721URIStorage {

  using Counters for Counters.Counter;
  Counters.Counter public _totalNFTs;
  uint public _totalClasses = 0;
  mapping(uint => ClassesBluePrint) public listOfClasses;
  mapping(uint => CommentBluePrint) public listOfComments;

  struct ClassesBluePrint {
    uint id;
    string cid;
    uint targetAmmount;
    uint totalDonations;
    address organizer;
    string[] reviews;
  }

  struct CommentBluePrint {
    uint id;
    string cid;
    address author;
  }

  event GroupCreated (
    uint id,
    string cid,
    uint targetAmmount,
    address organizer
  );

  event commentCreated (
    uint id,
    string cid,
    address author
  );

  constructor() ERC721("RatemyClass", "RMC") {}


  // calldata is read only, use for funct inputs as params
  function createClass(string calldata _cid, uint _targetAmmount) public {
    listOfClasses[_totalClasses] = ClassesBluePrint(_totalClasses, _cid, _targetAmmount, 0,  msg.sender, new string[](0));
    emit GroupCreated(_totalClasses, _cid, _targetAmmount, msg.sender);
    _totalClasses++;
  }

  function createReview(string calldata _cid, uint classId) public {
    //  storage modifies data
    ClassesBluePrint storage currentClass = listOfClasses[classId];
    currentClass.reviews.push(_cid);
  }

  function donate(uint _donationId, uint _donationAmmount) public {
    ClassesBluePrint storage _currentGroup = listOfClasses[_donationId];
    _currentGroup.totalDonations += _donationAmmount;
  }

  function getAllGroups() public view returns (ClassesBluePrint[] memory) {
      ClassesBluePrint[] memory groupsArray = new ClassesBluePrint[](_totalClasses);

      for (uint i = 0; i < _totalClasses; i++) {
          ClassesBluePrint storage currentItem = listOfClasses[i];
          groupsArray[i] = currentItem;
      }
      return groupsArray;
  }

// functions for cross contract
 function updateReview(string calldata _cid, uint classId) public {
    //  storage modifies data
    ClassesBluePrint storage currentClass = listOfClasses[classId];
    currentClass.reviews.push(_cid);
  }

  function getAllReviews(string calldata _cid, uint classId) public {
    //  storage modifies data
    ClassesBluePrint storage currentClass = listOfClasses[classId];
    currentClass.reviews.push(_cid);
  }

    function getGroupsByDeparment(_deparment) public view returns (ClassesBluePrint[] memory) {
      ClassesBluePrint[] memory groupsArray = new ClassesBluePrint[](_totalClasses);

      for (uint i = 0; i < _totalClasses; i++) {
          ClassesBluePrint storage currentItem = listOfClasses[i];
          groupsArray[i] = currentItem;
      }
      return groupsArray;
  }

      function getAllDonations() public view returns (ClassesBluePrint[] memory) {
      ClassesBluePrint[] memory groupsArray = new ClassesBluePrint[](_totalClasses);

      for (uint i = 0; i < _totalClasses; i++) {
          ClassesBluePrint storage currentItem = listOfClasses[i];
          groupsArray[i] = currentItem;
      }
      return donations;
  }


}


