# Setup

- Make sure you have docker
- Run `npm install`
- Run `npx playwright install`

# How to reproduce

Start the docker container:

```bash
docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.38.1 /bin/bash
```

Run this command:

```bash
xvfb-run npx playwright test --headed --workers 2 --repeat-each 10 --project webkit
```

You will see that the test runs are flaky and they seem to be influencing each other.

If you run this command without the headed flag, they'll pass:

```bash
xvfb-run npx playwright test --workers 2 --repeat-each 10 --project webkit
```

You don't need `xvfb-run` then but I kept it to make sure it's not the cause.

If you run the tests outside of docker in headed mode, they pass too when not on linux:

```bash
npx playwright test --headed --workers 2 --repeat-each 10 --project webkit
```
