docker-cartodb
==============

That container provides a fully working cartodb development solution
without the installation hassle.

Run and connect to locahost:3000 into your browser.

The default login is dev/pass. You may want to change it when you'll run
it for the outside.

How to build the container:
--------------

```
git clone https://github.com/jbuonagurio/docker-cartodb.git
docker build -t="jbuonagurio/docker-cartodb" docker-cartodb/
```

How to run the container:
--------------

```
docker run -t -i -p 3000:3000 -p 8080:8080 -p 8181:8181 jbuonagurio/docker-cartodb
```

You might need to add dev.localhost to your hosts file.

