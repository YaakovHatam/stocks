## firebase schedule format
*    *    *   *    *  Command_to_execute
|    |    |    |   |       
|    |    |    |    Day of the Week ( 0 - 6 ) ( Sunday = 0 )
|    |    |    |
|    |    |    Month ( 1 - 12 )
|    |    |
|    |    Day of Month ( 1 - 31 )
|    |
|    Hour ( 0 - 23 )
|
Min ( 0 - 59 )


## deploy
`firebase deploy --only "functions:scheduledFunctionCrontab"`

run with `--debug` of there's errors:
`firebase deploy --only "functions:scheduledFunctionCrontab" --debug`

## Test
emulator: `firebase emulators:start`

## finnhub api
price target: c0etd5n48v6p527umgtg

lse: bpul0uvrh5rd45tk1jrg