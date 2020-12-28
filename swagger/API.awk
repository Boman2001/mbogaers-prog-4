# awk -f API.awk swagger.yaml | sort -k2 -s

BEGIN {
  get  = "GET:\t";
  post = "POST:\t";
  put  = "PUT:\t";
  del  = "DELETE:\t";
  id   = "/{id}/";
}

{
  newline = 0;
  if ($0 ~ /^  "[a-zA-Z_/{}]+":/) {
    newline = 1;
    split($1, input, "\"");
    split(input[2], fields, "/");

    path = "";

    for (i in fields) {
      field = fields[i];
      if (field !~ /^$/) {
        if (field ~ /^{.+[Ii]d}$/)
          path = path "{id}";
        else
          path = path field;
        path = path "/";
      }
    }
    path;
  }
    
  switch ($0) {
    case "    get:":
      print get path;
      break;
    case "    post:":
      print post path;
      break;
    case "    put:":
      print put path;
      break;
    case "    delete:":
      print del path;
      break;
  }
}

END {}
