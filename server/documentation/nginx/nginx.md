# How to NGINX (SDC)

## Preparation/Checklist

- AWS<br>
  - 1 instance for nginx<br>
  - 1 instance for database<br>
  - X instances for api for horizontal scaling


- ### API servers
  - Servers are setup to connect to remote postgresql server (or other DBMS).
- ### Database
  - Your database open to remote connections and setup to allow them.


---
## Nginx Setup
Modified from
https://ringed-papaya-3bf.notion.site/Setting-up-NGINX-For-Load-Balancing-4703dc59e23e4457ab905b65baaa24ad

Connect to your nginx (how to not in this read me)
Commands:<br>
Install:
```
sudo apt update
```
```
sudo apt install nginx
```
start:<br>
```
sudo systemctl start nginx
```
---
### Configuration
config file:<br>
default location and open in nano:
```
sudo nano /etc/nginx/sites-enabled/default
```
what to add:<br>
- You will need to add your API server IPs and Ports in the appropriate area.<br>
- 1 server per line
- included is the section for loader Io testing verification
  - substitute your token in
- by default it will redirect all requests
  - you can add a path to the location for specific endpoint routing
  - you can also add extra locations for multiple endpoint routing 
- you can add multiple upstream groups for separate route/endpoint/api handling

```
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=10g 
                 inactive=60m use_temp_path=off;

# sdcgroup is just the name given to this server group, you can rename it what ever you like
upstream sdcgroup {
  least_conn;
  keepalive 500;
  # API public IPs go below here
  # example: server 123.456.789.01:9999;
  server PublicIpHoesHere:PortNumberGoesHere;
  server PublicIpHoesHere:PortNumberGoesHere;
  # queue 100 timeout=100; # you may have to delete this line for it to work
}

server {
  listen 80 backlog=4096;
  gzip on;

  # optional: location /URLPATHTOREDIRECTGOESHERE {
  location / {
    proxy_http_version 1.1;
    proxy_set_header Connection "";
    proxy_pass http://sdcgroup;

    proxy_cache my_cache;
		proxy_cache_valid any 10m;
    add_header X-Cache-Status $upstream_cache_status;
  }
  # loader IO verification stuff
  location /loaderio-ApiLongKeyTextThingHere {
    return 200 'loaderio-ApiLongKeyTextThingHere';
  }
}
```
what it does: 
  - upstream: 

restart Nginx after changing config:
```
sudo systemctl restart nginx
```
    



