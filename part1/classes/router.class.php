<?php

/**
 * This router will return a documentation or about page
 *
 * @author Rhys Halpin
 *
 */
class Router
{
    private $page;
    private $type = "HTML";

    public function __construct($recordset)
    {
        $url = $_SERVER["REQUEST_URI"];
        $path = parse_url($url)['path'];

        $path = str_replace(BASEPATH, "", $path);
        $pathArr = explode('/', $path);
        $path = (empty($pathArr[0])) ? "about" : $pathArr[0];

        ($path == "api")
            ? $this->api_route($pathArr, $recordset)
            : $this->html_route($path);

    }

    /**
    *   API route
    *@param $pathArr
    *@param $recordset
    */
    public function api_route($pathArr, $recordset)
    {
        $this->type = "JSON";
        $this->page = new JSONpage($pathArr, $recordset);
    }

    /**
    *  HTML route
    *@param $path 
    */
    public function html_route($path)
    {
        $ini['routes'] = parse_ini_file("config/routes.ini", true);
        $pageInfo = isset($path, $ini['routes'][$path])
            ? $ini['routes'][$path]
            : $ini['routes']['error'];

        $this->page = new WebPageWithNav($pageInfo['title'], $pageInfo['heading1'], $pageInfo['footer']);
        $this->page->addToBody($pageInfo['text']);
    }

    public function get_type()
    {
        return $this->type;
    }

    public function get_page()
    {
        return $this->page->get_page();
    }
}

?>