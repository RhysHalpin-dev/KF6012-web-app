<?php

/**
 * Creates a JSON page based on the parameters
 *
 * @author Rhys Halpin
 *
 */
class JSONpage
{
    private $page;
    private $recordset;

    /**
     * @param $pathArr - an array containing the route information
     */
    public function __construct($pathArr, $recordset)
    {
        $this->recordset = $recordset;
        $path = (empty($pathArr[1])) ? "api" : $pathArr[1];

        switch ($path) {
            case 'api':
                $this->page = $this->json_welcome();
                break;
            case 'authors':
                $this->page = $this->json_authors();
                break;
            case 'authorsContent':
                $this->page = $this->json_authorsContent();
                break;
            case 'authorsInvolved':
                $this->page = $this->json_authorsInvolved();
                break;
            case 'login':
                $this->page = $this->json_login();
                break;
            case 'update':
                $this->page = $this->json_update();
                break;
            case 'slots':
                $this->page = $this->json_slots();
                break;
            case 'sessionsContent':
                $this->page = $this->json_sessionsContent();
                 break;
            case 'rooms':
                $this->page = $this->json_rooms();
                break;
            case 'presentations':
                $this->page = $this->json_presentations();
                break;
            default:
                $this->page = $this->json_error();
                break;
        }
    }

    /**
     * @param $x - takes a  string and sanitizes it
     */
    private function sanitiseString($x)
    {
        return substr(trim(filter_var($x, FILTER_SANITIZE_STRING)), 0, 20);
    }

    /**
     * @param $x - takes a int and sanitizes it
     */
    private function sanitiseNum($x)
    {
        return filter_var($x, FILTER_VALIDATE_INT, array("options" => array("min_range" => 0, "max_range" => 30000)));
    }

    private function json_welcome()
    {
        $msg = array("message" => "welcome to CHI2018 API", "developer" => "RHYS HALPIN", 
        "Endpoints" => ["/KF6012/part1/api", "/KF6012/part1/api/login/", "/KF6012/part1/api/update/", "/KF6012/part1/api/authors/", "/KF6012/part1/api/authors?search=" , "/KF6012/part1/api/authors?page=", "/KF6012/part1/api/authorsContent?id=", "/KF6012/part1/api/authorsInvolved?id=", "/KF6012/part1/api/slots/", 
        "/KF6012/part1/api/sessions/", "/KF6012/part1/api/sessionsContent?id=" , "/KF6012/part1/api/rooms/", "/KF6012/part1/api/presentations/"]);
        return json_encode($msg);
    }

    private function json_error()
    {
        $msg = array("message" => "404 Not Found");
        return json_encode($msg);
    }

    /**
     * json_authors- Gets all authors in conference
     *@return recordset based on query and params
     * 
     */
    private function json_authors()
    {

        
        $query = "SELECT  authors.authorid, authors.name
        FROM authors";
        $params = [];
            
        
        if (isset($_REQUEST['search'])) {
            $query .= " WHERE authors.name LIKE :term";
            $term = $this->sanitiseString("%".$_REQUEST['search']."%");
            $params = ["term" => $term];
          } else {
            if (isset($_REQUEST['id'])) {
              $query .= " WHERE authors.authorid = :term";
              $term = $this->sanitiseNum($_REQUEST['id']);
              $params = ["term" => $term];
            }
          }

        
        if (isset($_REQUEST['page'])) {
            $query .= " ORDER BY name";
            $query .= " LIMIT 10 ";
            $query .= " OFFSET ";
            $query .= 10 * ($this->sanitiseNum($_REQUEST['page']) - 1);
        }

        return ($this->recordset->getJSONRecordSet($query, $params));

    }

    /**
     * json_authorsContent - Gets content that an author is involved in 
     *@return recordset based on query and params
     * 
     */

    private function json_authorsContent()
    {

        
        $query = "SELECT DISTINCT authors.authorId, authors.name, content.title as presentation,  content.abstract, content.award, sessions.name as session
        FROM authors
        INNER JOIN content_authors on content_authors.authorid = authors.authorid
        INNER JOIN content on content.contentId = content_authors.contentId
		INNER JOIN sessions_content on sessions_content.contentId = content.contentId
		INNER JOIN sessions on sessions.sessionId = sessions_content.sessionId";
        $params = [];
            
        
        if (isset($_REQUEST['search'])) {
            $query .= " WHERE authors.name LIKE :term";
            $term = $this->sanitiseString("%".$_REQUEST['search']."%");
            $params = ["term" => $term];
          } else {
            if (isset($_REQUEST['id'])) {
              $query .= " WHERE authors.authorid = :term";
              $term = $this->sanitiseNum($_REQUEST['id']);
              $params = ["term" => $term];
            }
          }

        
        if (isset($_REQUEST['page'])) {
            $query .= " ORDER BY name";
            $query .= " LIMIT 10 ";
            $query .= " OFFSET ";
            $query .= 10 * ($this->sanitiseNum($_REQUEST['page']) - 1);
        }

        return ($this->recordset->getJSONRecordSet($query, $params));

    }

    /**
     * json_authorsInvolved - Gets authors that are involved in presentations
     *  @return recordset based on query and params
     * 
     */

    private function json_authorsInvolved()
    {

        
        $query = "SELECT authors.authorid, authors.name, content.title, content.contentId
        FROM authors
        INNER JOIN content_authors on content_authors.authorid = authors.authorid
        INNER JOIN content on content.contentId = content_authors.contentId";
        $params = [];
            
        
        if (isset($_REQUEST['search'])) {
            $query .= " WHERE content.title LIKE :term";
            $term = $this->sanitiseString("%".$_REQUEST['search']."%");
            $params = ["term" => $term];
          } else {
            if (isset($_REQUEST['id'])) {
              $query .= " WHERE content.contentId = :term";
              $term = $this->sanitiseNum($_REQUEST['id']);
              $params = ["term" => $term];
            }
          }

        
        if (isset($_REQUEST['page'])) {
            $query .= " ORDER BY name";
            $query .= " LIMIT 10 ";
            $query .= " OFFSET ";
            $query .= 10 * ($this->sanitiseNum($_REQUEST['page']) - 1);
        }

        return ($this->recordset->getJSONRecordSet($query, $params));

    }


    /**
     * json_login -  returns a login session if accoount details are valid
     * @return array json - Http status code, message, admin and token
     * 
     */
    private function json_login()
    {
        $msg = "Invalid request. Username and password required";
        $status = 400;
        $admin = "NA";
        $token = null;
        $input = json_decode(file_get_contents("php://input"));

        if ($input) {

            if (isset($input->email) && isset($input->password)) {
                $query = "SELECT username, password, admin FROM users WHERE email LIKE :email";
                $params = ["email" => $input->email];
                $res = json_decode($this->recordset->getJSONRecordSet($query, $params), true);
                $password = ($res['count']) ? $res['data'][0]['password'] : null;

                if (password_verify($input->password, $res['data'][0]['password'])) {
                    $msg = "User authorised. Welcome " . $res['data'][0]['username'];
                    $admin = $res['data'][0]['admin'];
                    $status = 200;
                    $token = array();
                    $token['email'] = $input->email;
                    $token['admin'] = $res['data'][0]['admin'];
                    $token['iat'] = time();
                    $token['exp'] = time() + (60 * 60);
                    $jwtkey = JWTKEY;
                    $token = \Firebase\JWT\JWT::encode($token, $jwtkey);
                } else {
                    $msg = "username or password are invalid";
                    $status = 401;
                }
            }
        }
        return json_encode(array("status" => $status, "message" => $msg, "admin" => $admin, "token" => $token));
    }

    /**
     * json_update - updates session name  if session token is valid
     *@return array json - Http status code and message
     * 
     */
    private function json_update()
    {
        $input = json_decode(file_get_contents("php://input"));


        if (!$input) {
            return json_encode(array("status" => 400, "message" => "Invalid request"));
        }
        if (!isset($input->token)) {
            return json_encode(array("status" => 401, "message" => "Not authorised"));
        }
        if (!isset($input->name) || !isset($input->sessionId)) {
            return json_encode(array("status" => 400, "message" => "Invalid request"));
        }

        try {
            $jwtkey = JWTKEY;
            $tokenDecoded = \Firebase\JWT\JWT::decode($input->token, $jwtkey, array('HS256'));
        } catch (UnexpectedValueException $e) {
            return json_encode(array("status" => 401, "message" => $e->getMessage()));
        }

        $query = "UPDATE sessions SET name = :name WHERE sessionId = :sessionId";
        $params = ["name" => $input->name, "sessionId" => $input->sessionId];
        $res = $this->recordset->getJSONRecordSet($query, $params);
        return json_encode(array("status" => 200, "message" => "ok"));
    }

    /**
     * json_slots -  Gets schedule data
     * @return recordset based on query and params
     */
    private function json_slots()
    {
        
        $query = "SELECT slots.slotId,  slots.dayString, slots.startHour, slots.startMinute, slots.endHour, slots.endMinute, sessions.name, sessions.sessionId, session_types.name as type, authors.name as chair, rooms.name as location FROM slots
        INNER JOIN sessions on sessions.slotId = slots.slotId
		INNER JOIN session_types on session_types.typeId = sessions.typeId
		INNER JOIN authors on authors.authorId = sessions.chairId
		INNER JOIN rooms on sessions.roomId = rooms.roomId
		";
        $params = [];


        if (isset($_REQUEST['search'])) {
            $query .= " WHERE sessions.name LIKE :term";
            $term = $this->sanitiseString("%".$_REQUEST['search']."%");
            $params = ["term" => $term];
          } else {
            if (isset($_REQUEST['id'])) {
              $query .= " WHERE slots.slotId = :term";
              $term = $this->sanitiseNum($_REQUEST['id']);
              $params = ["term" => $term];
            }
          }

        
        if (isset($_REQUEST['page'])) {
            $query .= " ORDER BY dayInt";
            $query .= " LIMIT 10 ";
            $query .= " OFFSET ";
            $query .= 10 * ($this->sanitiseNum($_REQUEST['page']) - 1);
        }

        return ($this->recordset->getJSONRecordSet($query, $params));

    }

     /**
     * json_sessionContent -  Gets the content(presentations) of a session, sessionId name, title, contentId, abstract, award
     * @return recordset based on query and params
     */

    private function json_sessionsContent()
    {
        
        $query = "SELECT sessions.sessionId, sessions.name, content.title, content.contentId, content.abstract, content.award
        FROM sessions
        INNER JOIN sessions_content on sessions_content.sessionId = sessions.sessionId
        INNER JOIN content on content.contentId = sessions_content.contentId
        ";
        $params = [];

        
        if (isset($_REQUEST['search'])) {
            $query .= " WHERE sessions.name LIKE :term";
            $term = $this->sanitiseString("%".$_REQUEST['search']."%");
            $params = ["term" => $term];
          } else {
            if (isset($_REQUEST['id'])) {
              $query .= " WHERE sessions.sessionId = :term";
              $term = $this->sanitiseNum($_REQUEST['id']);
              $params = ["term" => $term];
            }
          }

        
        if (isset($_REQUEST['page'])) {
            $query .= " ORDER BY sessionId";
            $query .= " LIMIT 10 ";
            $query .= " OFFSET ";
            $query .= 10 * ($this->sanitiseNum($_REQUEST['page']) - 1);
        }

        return ($this->recordset->getJSONRecordSet($query, $params));

    }

     /**
     * json_rooms -  Gets all rooms at conference
     * @return recordset based on query and params
     */

    private function json_rooms()
    {
        
        $query = "SELECT * FROM rooms";
        $params = [];

        
        if (isset($_REQUEST['page'])) {
            $query .= " ORDER BY name";
            $query .= " LIMIT 10 ";
            $query .= " OFFSET ";
            $query .= 10 * ($this->sanitiseNum($_REQUEST['page']) - 1);
        }

        return ($this->recordset->getJSONRecordSet($query, $params));

    }

     /**
     * json_presentations -  Gets title, abstract and award for every presentation
     * @return recordset based on query and params
     */
    private function json_presentations()
    {
        
        $query = "SELECT * FROM content";
        $params = [];

        
        if (isset($_REQUEST['search'])) {
            $query .= " WHERE title LIKE :term";
            $term = $this->sanitiseString("%".$_REQUEST['search']."%");
            $params = ["term" => $term];
          } else {
            if (isset($_REQUEST['id'])) {
              $query .= " WHERE contentId = :term";
              $term = $this->sanitiseNum($_REQUEST['id']);
              $params = ["term" => $term];
            }
          }

        
        if (isset($_REQUEST['page'])) {

            $query .= " LIMIT 10 ";
            $query .= " OFFSET ";
            $query .= 10 * ($this->sanitiseNum($_REQUEST['page']) - 1);
        }

        return ($this->recordset->getJSONRecordSet($query, $params));

    }


    public function get_page()
    {
        return $this->page;
    }
}

?>