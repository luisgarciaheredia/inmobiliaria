<?php

class Project
{

    private $connection;
    private $table = "projects";
    private $id;
    private $project;
    private $status;

    public function __construct($connection)
    {
        $this->connection = $connection;
    }

    public function set_id($id)
    {
        $this->id = $id;
    }

    public function set_project($project)
    {
        $this->project = $project;
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
                    project,
                    status,
                    created_at,
                    updated_at
                )
                values
                (
                    '$this->project',
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
                where project like '%$query%'";
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
                    project = '$this->project',
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
