<?php

class Role
{

    private $connection;
    private $table = "roles";
    private $id;
    private $role;
    private $permissions;
    private $status;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function set_id($id)
    {
        $this->id = $id;
    }

    public function set_role($role)
    {
        $this->role = $role;
    }

    public function set_permissions($permissions)
    {
        $this->permissions = $permissions;
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
                    role,
                    permissions,
                    status,
                    created_at,
                    updated_at
                )
                values
                (
                    '$this->role',
                    '$this->permissions',
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
                select *
                from $this->table";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function get()
    {
        try {
            $sql = "
                select *
                from $this->table
                where id = $this->id";
            return $this->connection->query($sql)->fetchAll(PDO::FETCH_ASSOC);
        } catch (Exception $e) {
            echo "¡Error!: $e <br/>";
        }
    }

    public function search($query)
    {
        try {
            $sql = "
                select *
                from $this->table
                where role like '%$query%'";
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
                    role = '$this->role',
                    permissions = '$this->permissions',
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
}
