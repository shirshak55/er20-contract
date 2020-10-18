import React, { useState } from "react"
import { Form, Input, Grid, Label, Icon, Button } from "semantic-ui-react"
import { TxButton } from "./substrate-lib/components"
import { ContractPromise } from "@polkadot/api-contract"
import {useSubstrate} from "./substrate-lib"


// Feeling lazy to extract to its own file
let abi = JSON.parse(`
{
    "metadataVersion": "0.1.0",
    "source": {
      "hash": "0x20d1c761dd4038a02cd62ad52079a027fdb4d3de4463461cd740e091bcd25b08",
      "language": "ink! 3.0.0-rc1",
      "compiler": "rustc 1.49.0-nightly"
    },
    "contract": {
      "name": "erc20",
      "version": "3.0.0-rc1",
      "authors": [
        "Parity Technologies <admin@parity.io>"
      ]
    },
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "name": "initial_supply",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "name": [
            "new"
          ],
          "selector": "0xd183512b"
        }
      ],
      "docs": [],
      "events": [
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "name": "from",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 13
              }
            },
            {
              "docs": [],
              "indexed": true,
              "name": "to",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 13
              }
            },
            {
              "docs": [],
              "indexed": true,
              "name": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "name": "Transfer"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "name": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 5
              }
            },
            {
              "docs": [],
              "indexed": true,
              "name": "spender",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 5
              }
            },
            {
              "docs": [],
              "indexed": true,
              "name": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "name": "Approval"
        }
      ],
      "messages": [
        {
          "args": [],
          "docs": [],
          "mutates": false,
          "name": [
            "total_supply"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Balance"
            ],
            "type": 1
          },
          "selector": "0xdcb736b5"
        },
        {
          "args": [
            {
              "name": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "mutates": false,
          "name": [
            "balance_of"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Balance"
            ],
            "type": 1
          },
          "selector": "0x56e929b2"
        },
        {
          "args": [
            {
              "name": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 5
              }
            },
            {
              "name": "spender",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 5
              }
            }
          ],
          "docs": [],
          "mutates": false,
          "name": [
            "allowance"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "Balance"
            ],
            "type": 1
          },
          "selector": "0xf3cfff66"
        },
        {
          "args": [
            {
              "name": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 5
              }
            },
            {
              "name": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "transfer"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 12
          },
          "selector": "0xfae3a09d"
        },
        {
          "args": [
            {
              "name": "spender",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 5
              }
            },
            {
              "name": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "approve"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 12
          },
          "selector": "0x03d0e114"
        },
        {
          "args": [
            {
              "name": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 5
              }
            },
            {
              "name": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 5
              }
            },
            {
              "name": "value",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 1
              }
            }
          ],
          "docs": [],
          "mutates": true,
          "name": [
            "transfer_from"
          ],
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 12
          },
          "selector": "0xfcfb2ccd"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 1
              }
            },
            "name": "total_supply"
          },
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "struct": {
                        "fields": [
                          {
                            "layout": {
                              "cell": {
                                "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                                "ty": 2
                              }
                            },
                            "name": "header"
                          },
                          {
                            "layout": {
                              "struct": {
                                "fields": [
                                  {
                                    "layout": {
                                      "cell": {
                                        "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                                        "ty": 3
                                      }
                                    },
                                    "name": "len"
                                  },
                                  {
                                    "layout": {
                                      "array": {
                                        "cellsPerElem": 1,
                                        "layout": {
                                          "cell": {
                                            "key": "0x0200000001000000000000000000000000000000000000000000000000000000",
                                            "ty": 4
                                          }
                                        },
                                        "len": 4294967295,
                                        "offset": "0x0300000000000000000000000000000000000000000000000000000000000000"
                                      }
                                    },
                                    "name": "elems"
                                  }
                                ]
                              }
                            },
                            "name": "entries"
                          }
                        ]
                      }
                    },
                    "name": "keys"
                  },
                  {
                    "layout": {
                      "hash": {
                        "layout": {
                          "cell": {
                            "key": "0x0300000001000000000000000000000000000000000000000000000000000000",
                            "ty": 9
                          }
                        },
                        "offset": "0x0200000001000000000000000000000000000000000000000000000000000000",
                        "strategy": {
                          "hasher": "Blake2x256",
                          "postfix": "",
                          "prefix": "0x696e6b20686173686d6170"
                        }
                      }
                    },
                    "name": "values"
                  }
                ]
              }
            },
            "name": "balances"
          },
          {
            "layout": {
              "struct": {
                "fields": [
                  {
                    "layout": {
                      "struct": {
                        "fields": [
                          {
                            "layout": {
                              "cell": {
                                "key": "0x0300000001000000000000000000000000000000000000000000000000000000",
                                "ty": 2
                              }
                            },
                            "name": "header"
                          },
                          {
                            "layout": {
                              "struct": {
                                "fields": [
                                  {
                                    "layout": {
                                      "cell": {
                                        "key": "0x0400000001000000000000000000000000000000000000000000000000000000",
                                        "ty": 3
                                      }
                                    },
                                    "name": "len"
                                  },
                                  {
                                    "layout": {
                                      "array": {
                                        "cellsPerElem": 1,
                                        "layout": {
                                          "cell": {
                                            "key": "0x0400000002000000000000000000000000000000000000000000000000000000",
                                            "ty": 10
                                          }
                                        },
                                        "len": 4294967295,
                                        "offset": "0x0500000001000000000000000000000000000000000000000000000000000000"
                                      }
                                    },
                                    "name": "elems"
                                  }
                                ]
                              }
                            },
                            "name": "entries"
                          }
                        ]
                      }
                    },
                    "name": "keys"
                  },
                  {
                    "layout": {
                      "hash": {
                        "layout": {
                          "cell": {
                            "key": "0x0500000002000000000000000000000000000000000000000000000000000000",
                            "ty": 9
                          }
                        },
                        "offset": "0x0400000002000000000000000000000000000000000000000000000000000000",
                        "strategy": {
                          "hasher": "Blake2x256",
                          "postfix": "",
                          "prefix": "0x696e6b20686173686d6170"
                        }
                      }
                    },
                    "name": "values"
                  }
                ]
              }
            },
            "name": "allowances"
          }
        ]
      }
    },
    "types": [
      {
        "def": {
          "primitive": "u128"
        }
      },
      {
        "def": {
          "composite": {
            "fields": [
              {
                "name": "last_vacant",
                "type": 3
              },
              {
                "name": "len",
                "type": 3
              },
              {
                "name": "len_entries",
                "type": 3
              }
            ]
          }
        },
        "path": [
          "ink_storage",
          "collections",
          "stash",
          "Header"
        ]
      },
      {
        "def": {
          "primitive": "u32"
        }
      },
      {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 8
                  }
                ],
                "name": "Vacant"
              },
              {
                "fields": [
                  {
                    "type": 5
                  }
                ],
                "name": "Occupied"
              }
            ]
          }
        },
        "params": [
          5
        ],
        "path": [
          "ink_storage",
          "collections",
          "stash",
          "Entry"
        ]
      },
      {
        "def": {
          "composite": {
            "fields": [
              {
                "type": 6
              }
            ]
          }
        },
        "path": [
          "ink_env",
          "types",
          "AccountId"
        ]
      },
      {
        "def": {
          "array": {
            "len": 32,
            "type": 7
          }
        }
      },
      {
        "def": {
          "primitive": "u8"
        }
      },
      {
        "def": {
          "composite": {
            "fields": [
              {
                "name": "next",
                "type": 3
              },
              {
                "name": "prev",
                "type": 3
              }
            ]
          }
        },
        "path": [
          "ink_storage",
          "collections",
          "stash",
          "VacantEntry"
        ]
      },
      {
        "def": {
          "composite": {
            "fields": [
              {
                "name": "value",
                "type": 1
              },
              {
                "name": "key_index",
                "type": 3
              }
            ]
          }
        },
        "params": [
          1
        ],
        "path": [
          "ink_storage",
          "collections",
          "hashmap",
          "ValueEntry"
        ]
      },
      {
        "def": {
          "variant": {
            "variants": [
              {
                "fields": [
                  {
                    "type": 8
                  }
                ],
                "name": "Vacant"
              },
              {
                "fields": [
                  {
                    "type": 11
                  }
                ],
                "name": "Occupied"
              }
            ]
          }
        },
        "params": [
          11
        ],
        "path": [
          "ink_storage",
          "collections",
          "stash",
          "Entry"
        ]
      },
      {
        "def": {
          "tuple": [
            5,
            5
          ]
        }
      },
      {
        "def": {
          "primitive": "bool"
        }
      },
      {
        "def": {
          "variant": {
            "variants": [
              {
                "name": "None"
              },
              {
                "fields": [
                  {
                    "type": 5
                  }
                ],
                "name": "Some"
              }
            ]
          }
        },
        "params": [
          5
        ],
        "path": [
          "Option"
        ]
      }
    ]
  }
`)

export default function SmartContract(props) {
  const { api } = useSubstrate()

  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ addressTo: null, amount: 0 })
  const { accountPair } = props

  const onChange = (_, data) =>
    setFormState((prev) => ({ ...prev, [data.state]: data.value }))

  const { addressTo, amount } = formState

  const handleClick = async () => {
    console.log("account pair", accountPair)
    const { address } = accountPair

   let contract_address ="5F2u8Db68mMVTC9BvzXssgPvXjY6erExMtXxi25P2TntY1xF" 
    const contract = new ContractPromise(api, abi, address)

    const gasLimit = 3000n * 1000000n
    const incValue = 1

    const value = await contract.tx
      .transfer_from(address,addressTo,amount)
      .signAndSend(addressTo, (result) => {
        if (result.status.isInBlock) {
          console.log("in a block")
        } else if (result.status.isFinalized) {
          console.log("finalized")
        }
      })

    console.log(value.result.toHuman())

    if (value.result.isSuccess) {
      const success = value.result.asSuccess
      console.log(value.output.toHuman())

      setStatus(
        `transferred ${amount} Gas consumed ${success.gasConsumed.toHuman()}`,
      )
    } else {
      setStatus("Call failed")
    }
  }

  return (
    <Grid.Column width={8}>
      <h1>Smart Contract Transfer</h1>
      <Form>
        <Form.Field>
          <Label basic color="teal">
            <Icon name="hand point right" />1 Unit = 1000000000000
          </Label>
        </Form.Field>
        <Form.Field>Transfer Via Smart Contract. Account ID {}</Form.Field>

        <Form.Field>
          <Input
            fluid
            label="To"
            type="text"
            placeholder="address"
            state="addressTo"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="Amount"
            type="number"
            state="amount"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: "center" }}>
          <Button
            basic
            color="blue"
            type="submit"
            onClick={handleClick}
            // TODO not handled disabled
          >
            Submit
          </Button>

          <TxButton
            accountPair={accountPair}
            label="Submit"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: "balances",
              callable: "transfer",
              inputParams: [addressTo, amount],
              paramFields: [true, true],
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: "break-word" }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}

