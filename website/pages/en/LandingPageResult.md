## Left Dataset(LeftFile)

| Value1  | Value2 |
|---------|--------|
| C | A |
| X | B |
| A | C |

## Right Dataset (RightFile)

| Value1  | Value2 |
|---------|--------|
| C | X |
| B | Y |
| A | Z |

## Inner Join Results (InnerJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| A | C | Z |
|2| C | A | X |

## Left Outer Join Results (LOutJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| A | C | Z |
|2| C | A | X |
|3| X | B |  |

## Right Outer Join Results (ROutJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| A | C | Z |
|2| B |   | Y |
|3| C | A | X |

## Full Outer Join Results (FOutJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| A | C | Z |
|2| B |   | Y |
|3| C | A | X |
|4| X | B |   |

## Left Only Join Results (LOnlyJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| X | B |  |

## Right Only Join Results (ROnlyJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| B |  | Y |

## Full Only Join Results (FOnlyJoinedRecs)

|Rec#| Value1  | LeftValue2 | RightValue2 |
|----|---------|------------|------------|
|1| B |  | Y |
|2| X | B|  |
