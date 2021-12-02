# Sequelize Remote Connection 

In your sequelize object creation<br>
Which should look something like this:
> const seq = new Sequelize(database, user, password, {<br>
>   &nbsp;&nbsp; dialect: 'postgres',<br>
>   &nbsp;&nbsp; host: '/var/run/postgresql',<br>
>  &nbsp;&nbsp; define: {<br>
>    &nbsp;&nbsp; &nbsp; &nbsp; timestamps: false<br>
>  &nbsp;&nbsp; },<br>
>  &nbsp;&nbsp; logging: false<br>
> });

Change host and add port: 
```
host: 'IP.ADDRESS.GOES.HERE',
port: 'PORTNUMBERHERE',
```