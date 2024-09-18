/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/agrotree_manager.json`.
 */
export type AgrotreeManager = {
  address: "39yMDf98YtULLPZxR5R6sDhBwQi7tvUJb4mUwbxsxpvx";
  metadata: {
    name: "agrotreeManager";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "createCollection";
      discriminator: [156, 251, 92, 54, 233, 2, 16, 82];
      accounts: [
        {
          name: "creator";
          writable: true;
          signer: true;
        },
        {
          name: "collection";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 108, 108, 101, 99, 116, 105, 111, 110];
              },
              {
                kind: "arg";
                path: "cid";
              }
            ];
          };
        },
        {
          name: "collectionMint";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [
                  99,
                  111,
                  108,
                  108,
                  101,
                  99,
                  116,
                  105,
                  111,
                  110,
                  45,
                  109,
                  105,
                  110,
                  116
                ];
              },
              {
                kind: "account";
                path: "collection";
              }
            ];
          };
        },
        {
          name: "associatedTokenAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "creator";
              },
              {
                kind: "const";
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ];
              },
              {
                kind: "account";
                path: "collectionMint";
              }
            ];
            program: {
              kind: "const";
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ];
            };
          };
        },
        {
          name: "collectionMetadata";
          writable: true;
        },
        {
          name: "collectionEdition";
          writable: true;
        },
        {
          name: "tokenMetadataProgram";
          address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "associatedTokenProgram";
          address: "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "cid";
          type: "u64";
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        }
      ];
    },
    {
      name: "createTree";
      discriminator: [165, 83, 136, 142, 89, 202, 47, 220];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "collection";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 108, 108, 101, 99, 116, 105, 111, 110];
              },
              {
                kind: "arg";
                path: "cid";
              }
            ];
          };
        },
        {
          name: "mtree";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 116, 114, 101, 101];
              },
              {
                kind: "account";
                path: "collection";
              }
            ];
          };
        },
        {
          name: "treeConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "merkleTree";
              }
            ];
            program: {
              kind: "account";
              path: "mplBubblegumProgram";
            };
          };
        },
        {
          name: "merkleTree";
          writable: true;
          signer: true;
        },
        {
          name: "mplBubblegumProgram";
          address: "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY";
        },
        {
          name: "splCompressionProgram";
          address: "cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK";
        },
        {
          name: "logWrapperProgram";
          address: "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "cid";
          type: "u64";
        },
        {
          name: "maxDepth";
          type: "u32";
        },
        {
          name: "maxBufferSize";
          type: "u32";
        }
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "config";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 103, 114, 111, 45, 99, 111, 110, 102, 105, 103];
              }
            ];
          };
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [];
    },
    {
      name: "mintToCollection";
      discriminator: [163, 150, 74, 141, 206, 50, 1, 195];
      accounts: [
        {
          name: "payer";
          writable: true;
          signer: true;
        },
        {
          name: "collection";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [99, 111, 108, 108, 101, 99, 116, 105, 111, 110];
              },
              {
                kind: "arg";
                path: "cid";
              }
            ];
          };
        },
        {
          name: "mtree";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 116, 114, 101, 101];
              },
              {
                kind: "account";
                path: "collection";
              }
            ];
          };
        },
        {
          name: "treeConfig";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "account";
                path: "merkleTree";
              }
            ];
            program: {
              kind: "account";
              path: "mplBubblegumProgram";
            };
          };
        },
        {
          name: "merkleTree";
          writable: true;
        },
        {
          name: "leafOwner";
        },
        {
          name: "leafDelegate";
        },
        {
          name: "collectionMint";
        },
        {
          name: "collectionMetadata";
          writable: true;
        },
        {
          name: "collectionEdition";
          docs: ["CHECK"];
          writable: true;
        },
        {
          name: "mplBubblegumProgram";
          address: "BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY";
        },
        {
          name: "splCompressionProgram";
          address: "cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK";
        },
        {
          name: "logWrapperProgram";
          address: "noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV";
        },
        {
          name: "tokenMetadataProgram";
          address: "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        }
      ];
      args: [
        {
          name: "cid";
          type: "u64";
        },
        {
          name: "name";
          type: "string";
        },
        {
          name: "symbol";
          type: "string";
        },
        {
          name: "uri";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "agroTreeCollection";
      discriminator: [179, 202, 101, 123, 73, 85, 194, 200];
    },
    {
      name: "agroTreeConfig";
      discriminator: [53, 171, 243, 0, 161, 92, 55, 91];
    },
    {
      name: "mTree";
      discriminator: [245, 118, 62, 198, 89, 245, 253, 94];
    }
  ];
  errors: [
    {
      code: 6000;
      name: "customError";
      msg: "Custom error message";
    },
    {
      code: 6001;
      name: "uriTooLong";
    },
    {
      code: 6002;
      name: "invalidUri";
    },
    {
      code: 6003;
      name: "invalidNftName";
    },
    {
      code: 6004;
      name: "symbolTooLong";
    },
    {
      code: 6005;
      name: "invalidAccountOwner";
    },
    {
      code: 6006;
      name: "metadataAccountAlreadyInUse";
    },
    {
      code: 6007;
      name: "masterEditionAccountAlreadyInUse";
    },
    {
      code: 6008;
      name: "unauthorized";
    },
    {
      code: 6009;
      name: "invalidCollectionId";
    }
  ];
  types: [
    {
      name: "agroTreeCollection";
      type: {
        kind: "struct";
        fields: [
          {
            name: "id";
            type: "u64";
          },
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "mint";
            type: "pubkey";
          },
          {
            name: "metadata";
            type: "pubkey";
          },
          {
            name: "masterEdition";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "agroTreeConfig";
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    },
    {
      name: "mTree";
      type: {
        kind: "struct";
        fields: [
          {
            name: "creator";
            type: "pubkey";
          },
          {
            name: "collection";
            type: "pubkey";
          },
          {
            name: "merkleTree";
            type: "pubkey";
          },
          {
            name: "treeConfig";
            type: "pubkey";
          },
          {
            name: "bump";
            type: "u8";
          }
        ];
      };
    }
  ];
  constants: [
    {
      name: "collectionMintSeed";
      type: "bytes";
      value: "[99, 111, 108, 108, 101, 99, 116, 105, 111, 110, 45, 109, 105, 110, 116]";
    },
    {
      name: "collectionSeed";
      type: "bytes";
      value: "[99, 111, 108, 108, 101, 99, 116, 105, 111, 110]";
    },
    {
      name: "configSeed";
      type: "bytes";
      value: "[97, 103, 114, 111, 45, 99, 111, 110, 102, 105, 103]";
    },
    {
      name: "mtreeSeed";
      type: "bytes";
      value: "[109, 116, 114, 101, 101]";
    }
  ];
};
