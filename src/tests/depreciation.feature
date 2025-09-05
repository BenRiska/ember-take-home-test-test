Feature: Depreciation for fixed asset expenses

  Background:
    Given a business is looking to track depreciation
    And I have the following assets:
      | assetName | purchaseDate | purchaseAmount | depreciationMethod |
      | Laptop A  | 2020-04-15   | 1200           | straight-line      |
      | Forklift  | 2020-01-03   | 24000          | reducing-balance   |
      | Desk 12   | 2023-11-30   | 350            | straight-line      |

  Scenario: Calculating depreciation test 1
    And I run a netbook value report with 2020-12-31 as the end date
    Then the system should show me the following information:
      | Asset    | Cost  | Accumulated Depreciation | In Year Depreciation | Net Book Value |
      | Laptop A | 1200  | 171.52                   | 171.52               | 1028.48        |
      | Forklift | 24000 | 5967.21                  | 5967.21              | 18032.79       |
      | Desk 12  | 350   | 0                        | 0                    | 350            |

  Scenario: Calculating depreciation test 2
    And I run a netbook value report with 2022-06-30 as the end date
    Then the system should show me the following information:
      | Asset    | Cost  | Accumulated Depreciation | In Year Depreciation | Net Book Value |
      | Laptop A | 1200  | 530.34                   | 118.95               | 669.66         |
      | Forklift | 24000 | 12152.09                 | 1676.68              | 11847.91       |
      | Desk 12  | 350   | 0                        | 0                    | 350            |

  Scenario: Calculating depreciation test 3
    And I run a netbook value report with 2025-08-31 as the end date
    Then the system should show me the following information:
      | Asset    | Cost  | Accumulated Depreciation | In Year Depreciation | Net Book Value |
      | Laptop A | 1200  | 1200                     | 68.35                | 0              |
      | Forklift | 24000 | 19243.96                 | 949.65               | 4756.04        |
      | Desk 12  | 350   | 122.80                   | 46.55                | 227.20         |