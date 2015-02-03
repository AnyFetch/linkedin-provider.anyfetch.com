# Linkedin provider
> Visit http://anyfetch.com for details about AnyFetch.

AnyFetch provider for files stored in Linkedin

You will need to populate your local .env file with the following variables

```bash
# Go to https://www.linkedin.com/secure/developer to ask for app id and secret
export LINKEDIN_API_KEY="linkedin-api"
export LINKEDIN_SECRET_TOKEN="linkedin-secret"

# Provider URL, most probably https://your-host
export PROVIDER_URL="https://your-host"

# AnyFetch app id and secret
export ANYFETCH_API_ID="anyfetch-app-id"
export ANYFETCH_API_SECRET="anyfetch-app-secret"

```

# How does it work?
## Init
AnyFetch API will call `/init/connect` with anyfetch authorization code. We will generate a request_token and transparently redirect the user to Linkedin consentment page.
Linkedin will then call us back on `/init/callback`. We'll check our request_token has been granted approval, and store this.

Support: `support@anyfetch.com`.
