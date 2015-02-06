# Linkedin provider
> Visit http://anyfetch.com for details about AnyFetch.

AnyFetch provider for connections stored in Linkedin

You will need to populate your local .env file with the following variables

```bash
# Go to https://www.linkedin.com/secure/developer to ask for app id and secret
LINKEDIN_API_KEY="linkedin-api"
LINKEDIN_SECRET_TOKEN="linkedin-secret"

# Provider URL, most probably https://your-host
PROVIDER_URL="https://your-host"
-
# AnyFetch app id and secret
ANYFETCH_API_ID="anyfetch-app-id"
ANYFETCH_API_SECRET="anyfetch-app-secret"
LINKEDIN_FAKE_ACCESS_TOKEN="Linkedin fake access token" // FOR TESTING PURPOSES
```

# About LINKEDIN_FAKE_ACCESS_TOKEN

Writing tests for a provider can be tricky.

To test the linkedin provider we strongly advise you to create a fake linkedin account and to add ONLY yourself to your connections.

Register your app on manager-staging.anyfetch.com, start the server in bin/server, fire up a Redis and MongoDB server and visit this url:

https://manager-staging.anyfetch.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Finit%2Fconnect

You can get a client id under "Client Id" on this page https://manager-staging.anyfetch.com/developers

After your Linkedin account has been linked to the provider, connect to mongo and find your access_token in the tokens collection under 'data'

You can now add it to your .env file and fire up `npm test`


# How does it work?
## Init
AnyFetch API will call `/init/connect` with anyfetch authorization code. We will generate a request_token and transparently redirect the user to Linkedin consentment page.
Linkedin will then call us back on `/init/callback`. We'll check our request_token has been granted approval, and store this.

## Update
To update a users document list curl on localhost:8000

http://localhost:8000/update?access_token=ANYFETCH_ACCESS_TOKEN&documents_per_update=NUMBER_OF_DOCUMENTS&force=1

Support: `support@anyfetch.com`.
