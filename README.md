# Notes:
- Hover and update feature which was requested on Liquidity chart was not implemented due to limitations from Apexchart library.
- Labels on x-axis on Liquidity chart are not precise and somewhat chaotic due to limitations from Apexchart library.
- Gradients on volume chart are adapted to reflect design as close as possible, but Apexchart library restricted me to apply exact same type of styling to bars.
- Volume chart bars might not always stick to left due to restriction of Apexchart library (since I literally can't control it anyhow).
- To support 'All' time range, I would have needed to support chart dragging and pagination which I found unnecessary for test task, that's why for 'All' time range, for liquidity chart: last 365 days, for volume chat: last 100 days.

### DEMO:
https://nikigeez.github.io/sushi-dashboard/

### Figma:
https://www.figma.com/file/JWcMbstV3WI0B6Lf0N66bh/Test-exercise?node-id=2%3A12

#### Development

Just run `yarn dev`.

#### Production

Run `yarn build`. The generated files will be on the `dist` folder.

#### Testing

Run `yarn test`. Tests are performed on production build, so be sure to build your app first.
