<?php

class User
{

    private $connection;
    private $table = "users";
    private $id;
    private $name;
    private $email;
    private $user;
    private $password;
    private $role_id;
    private $status;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function set_id($id)
    {
        $this->id = $id;
    }

    public function set_name($name)
    {
        $this->name = $name;
    }

    public function set_email($email)
    {
        $this->email = $email;
    }

    public function set_user($user)
    {
        $this->user = $user;
    }

    public function set_password($password)
    {
        $this->password = $password;
    }

    public function set_role_id($role_id)
    {
        $this->role_id = $role_id;
    }

    public function set_status($status)
    {
        $this->status = $status;
    }

    public function create()
    {
        try {
            $now = date("Y-m-d H:i:s");
            $sql = "
                insert into $this->table
                (
                    name,
                    email,
                    user,
                    password,
                    role_id,
                    status,
                    created_at,
                    updated_at
                )
                values
                (
                    '$this->name',
                    '$this->email',
                    '$this->user',
                    '$this->password',
                    '$this->role_id',
                    '$this->status',
                    '$now',
                    '$now'
                )";
            $this->connection->query($sql);
            return $this->connection->lastInsertId();
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function getAll()
    {
        try {
            $sql = "
                select
                    $this->table.id,
                    $this->table.name,
                    $this->table.email,
                    $this->table.user,
                    $this->table.password,
                    $this->table.role_id,
                    roles.role,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join roles
                    on $this->table.role_id = roles.id";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function get()
    {
        try {
            $sql = "
                select 
                    $this->table.id,
                    $this->table.name,
                    $this->table.email,
                    $this->table.user,
                    $this->table.password,
                    $this->table.role_id,
                    roles.role,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join roles
                    on $this->table.role_id = roles.id
                where $this->table.id = $this->id";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function search($query)
    {
        try {
            $sql = "
                select 
                    $this->table.id,
                    $this->table.name,
                    $this->table.email,
                    $this->table.user,
                    $this->table.password,
                    $this->table.role_id,
                    roles.role,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join roles
                    on $this->table.role_id = roles.id
                where 
                    name like '%$query%'
                    or user like '%$query%'
                    or role like '%$query%'";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function update()
    {
        try {
            $now = date("Y-m-d H:i:s");
            $sql = "
                update $this->table
                set
                    name = '$this->name',
                    email = '$this->email',
                    user = '$this->user',
                    password = '$this->password',
                    role_id = '$this->role_id',
                    status = '$this->status',
                    updated_at = '$now'
                where id = $this->id";
            return $this->connection->query($sql)->rowCount();
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function delete()
    {
        try {
            $sql = "
                delete from $this->table
                where id = $this->id";
            return $this->connection->query($sql)->rowCount();
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function login()
    {
        try {
            $sql = "
                select 
                    $this->table.id,
                    $this->table.name,
                    $this->table.email,
                    $this->table.user,
                    $this->table.password,
                    $this->table.role_id,
                    roles.role,
                    roles.permissions,
                    $this->table.status,
                    $this->table.created_at,
                    $this->table.updated_at
                from $this->table
                inner join roles
                    on $this->table.role_id = roles.id
                where user = '$this->user' and password = '$this->password'";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }
}
