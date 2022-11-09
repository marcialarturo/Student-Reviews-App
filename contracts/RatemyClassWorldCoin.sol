// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.10;

// import "@openzeppelin/contracts/utils/Counters.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import { ByteHasher } from './helpers/ByteHasher.sol';
// import { IWorldID } from './interfaces/IWorldID.sol';

// contract RatemyClassWorldCoin is ERC721URIStorage {

//   using ByteHasher for bytes;
//   using Counters for Counters.Counter;
//   Counters.Counter public _totalNFTs;
//   uint public _totalClasses = 0;
//   mapping(uint => ClassesBluePrint) public listOfClasses;


//   /// @notice Thrown when attempting to reuse a nullifier
//     error InvalidNullifier();
//     /// @dev The WorldID instance that will be used for verifying proofs
//     // IWorldID internal immutable worldId;
//     /// @dev The WorldID group ID (1)
//     uint256 internal immutable groupId = 1;
//     /// @dev Whether a nullifier hash has been used already. Used to prevent double-signaling
//     mapping(uint256 => bool) internal nullifierHashes;



//   struct ClassesBluePrint {
//     uint id;
//     string cid;
//     uint targetAmmount;
//     uint totalDonations;
//     address organizer;
//     // comments jas ti be an array
//   }

//   event GroupCreated (
//     uint id,
//     string cid,
//     uint targetAmmount,
//     address organizer
//   );

//   constructor() ERC721("RatemyClass", "RMC") {}
//   // calldata is read only, use for funct inputs as params
//   // function createClass(string calldata _cid, uint _targetAmmount) public {
//   function createClass(string calldata _cid, uint _targetAmmount, address input, uint256 root, uint256 nullifierHash, uint256[8] calldata proof) public {
//     // first, we make sure this person hasn't done this before
//     if (nullifierHashes[nullifierHash]) revert InvalidNullifier();
//     then, we verify they're registered with WorldID, and the input they've provided is correct
//     worldId.verifyProof(
//       root,
//       groupId,
//       abi.encodePacked(input).hashToField(),
//       nullifierHash,
//       abi.encodePacked(address(this)).hashToField(),
//       proof
//   );
//   finally, we record they've done this, so they can't do it again (proof of uniqueness)
//   nullifierHashes[nullifierHash] = true;


//   listOfClasses[_totalClasses] = ClassesBluePrint(_totalClasses, _cid, _targetAmmount, 0, msg.sender);
//     emit GroupCreated(_totalClasses, _cid, _targetAmmount, msg.sender);
//     _totalClasses++;
//   }

//   function donate(uint _donationId, uint _donationAmmount) public {
//     ClassesBluePrint storage _currentGroup = listOfClasses[_donationId];
//     _currentGroup.totalDonations += _donationAmmount;
//   }

//   function getAllGroups() public view returns (ClassesBluePrint[] memory) {
//       ClassesBluePrint[] memory groupsArray = new ClassesBluePrint[](_totalClasses);

//       for (uint i = 0; i < _totalClasses; i++) {
//           ClassesBluePrint storage currentItem = listOfClasses[i];
//           groupsArray[i] = currentItem;
//       }
//       return groupsArray;
//   }

//   function formatPermissions() public view returns (bytes memory) {
//      return abi.encodeCall(
//             cfaV1Lib.cfa.authorizeFlowOperatorWithFullControl,
//             (
//                 ISuperfluidToken(superToken),
//                 address(this),
//                 new bytes(0)
//             )
//         );
//     }

//     function createFlow(address receiver, int96 flowRate, uint256 toWrap) external {
//         _transfer(msg.sender, address(this), toWrap);
//         _approve(address(this), superToken, toWrap);
//         IAlluoSuperToken(superToken).upgradeTo(msg.sender, toWrap, "");
//         cfaV1Lib.createFlowByOperator( msg.sender, receiver, ISuperfluidToken(superToken), flowRate);
//         ISuperfluidResolver(superfluidResolver).addToChecker(msg.sender, receiver);
//         emit CreateFlow(msg.sender, receiver, flowRate);
//     }
//     function stopFlowWhenCritical(address sender, address receiver) external onlyRole(DEFAULT_ADMIN_ROLE) {
//         cfaV1Lib.deleteFlowByOperator(sender, receiver, ISuperfluidToken(superToken));
//         emit DeletedFlow(sender, receiver);
//     }

//      function forceWrap(address sender) external onlyRole(DEFAULT_ADMIN_ROLE) {
//           uint256 balance = balanceOf(address(sender));
//           _transfer(sender, address(this), balance);
//           _approve(address(this), superToken, balance);
//           IAlluoSuperToken(superToken).upgradeTo(sender, balance, "");
//       }

// }


