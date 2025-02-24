# MC D Lunchin

# Installation

1.	Install dependencies: `nodejs`, `npm`.
2.	You'll also need a MySQL server.

## Database

1.	In your MySQL server, create a database and invoke `DB/init.sql`.
2.	Create file `mc-d-lunchin-backend/.env` with the following format:

```
host=[IP of DB Server]
user=[User of DB Server]
password=[Password for user]
database=[DB Name]
port=[Port of DB Server]
```

## Backend

1.	Invoke `npm i` in `mc-d-lunchin-backend`.
2.	Ensure that `mc-d-lunchin-backend/start-server.sh` is executable.
3.	Copy all of `mc-d-lunchin-backend` into `/var/mc-d-lunchin`.
4.	Copy `mc-d-lunchin.service` into `/etc/systemd/system`.

## Frontend

1.	Invoke `npm i` in `mc-d-lunchin-frontend`.
2.	Invoke `npm run build` in `mc-d-lunchin-frontend`.
3.	Copy all of `mc-d-lunchin-frontend` into `/var/mc-d-lunchin`.

# Usage

1.	Ensure that your MySQL server is running.
2.	Start the `mc-d-lunchin` service: `systemctl start mc-d-lunchin`.