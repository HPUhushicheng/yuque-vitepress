别选arrow格式的，真麻烦

![](../../images/27007c437843f020857c448b2d5e5967.png)

![](../../images/dbc9d0e148eaaa105ff11b8d7c989035.png)

```shell
import pandas as pd

df = pd.read_json("hf://datasets/sahil2801/CodeAlpaca-20k/code_alpaca_20k.json")
df.to_json('output.json', orient='records', lines=True)
```

