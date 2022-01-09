//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract FileStorage {
    string public name = "File Storage Contract";
    uint256 public filesCount = 0;

    mapping(uint256 => File) public files;

    struct File {
        uint256 id;
        string name;
        string hash;
        string description;
        uint256 size;
        string file_type;
        address payable uploader;
        uint256 created_at;
        uint256 updated_at;
    }
    event FileUploaded(
        uint256 id,
        string name,
        string hash,
        string description,
        uint256 size,
        string file_type,
        address payable uploader,
        uint256 created_at,
        uint256 updated_at
    );

    constructor() {}

    function uploadFile(
        string memory _hash,
        string memory _name,
        uint256 _size,
        string memory _type,
        string memory _description
    ) public {
        require(bytes(_hash).length > 0);
        require(bytes(_name).length > 0);
        require(bytes(_type).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0));
        require(_size > 0);
        files[filesCount] = File(
            filesCount,
            _name,
            _hash,
            _description,
            _size,
            _type,
            payable(msg.sender),
            block.timestamp,
            block.timestamp
        );
        filesCount++;
        emit FileUploaded(
            filesCount - 1,
            _name,
            _hash,
            _description,
            _size,
            _type,
            payable(msg.sender),
            block.timestamp,
            block.timestamp
        );
    }
}
