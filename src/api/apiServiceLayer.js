// axios
import axios from "axios";
import store from "@/store/index";

const baseURL = "https://api.appledailystore.com/";
export default class ApiServiceLayer {
  async get(url, headers = {}, queryStrings, isAuthorized = true) {
    // define variables for keep url and queryString
    let apiUrl = baseURL + url;
    let queryString = "";
    let fullHeaders = {};
    let token = store.state.login.loginTempToken;

    //check for queryStrings parameter exist, if true save this in queryString variable
    if (queryStrings) {
      queryString = this.queryStringGenerator(queryStrings);
    }

    if (isAuthorized) {
      fullHeaders = {
        ...headers,
        Authorization: token,
      };
    } else {
      fullHeaders = { "content-type": "application/json", ...headers };
    }

    try {
      // call api with axios and send apiUrl and queryString, save resuts in res variable
      const res = await axios.get(apiUrl + queryString, {
        headers: fullHeaders,
      });

      //check for code of response, if 200 set data.status to "OK" else set "ERROR"
      return res.data;
    } catch (error) {
      // console.log('ssss',error.response.status);
      return error.response

    }
  }

  async post(url, data, headers = {}, isAuthorized) {
    let apiUrl = baseURL + url;
    let fullHeaders = {};
    let token = store.state.login.loginTempToken;
    fullHeaders = {
      Authorization: token,
      "Content-Type": "application/json",
      ...headers,
    };

    try {
      const res = await axios.post(apiUrl, data, {
        headers: fullHeaders,
      });

      //check for code of response, if 200 set data.status to "OK" else set "ERROR"

      if (res.data.code === 200) {
        res.data.status = "OK";
        return res.data;
      } else if (res.data.code === 500) {
        res.data.status = "ERROR";
        return res.data;
      }

      return res.data;
    } catch (error) {
      return error.response
    }
  }

  async delete(url, headers = {}, queryStrings, isAuthorized = true) {
    // define variables for keep url and response
    let apiUrl = baseURL + url;
    let queryString = "";
    let fullHeaders = {};
    let token = store.state.login.loginTempToken;

    //check for queryStrings parameter exist, if true save this in queryString variable
    if (queryStrings) {
      queryString = this.queryStringGenerator(queryStrings);
    }

    fullHeaders = {
      Authorization: token,
      "Content-Type": "application/json",
      ...headers,
    };

    try {
      const res = await axios.delete(apiUrl + queryString, {
        headers: fullHeaders,
      });

      //check for code of response, if 200 set data.status to "OK" else set "ERROR"

      if (res.data.code === 200) {
        res.data.status = "OK";
        return res.data;
      } else if (res.data.code === 500) {
        res.data.status = "ERROR";
        return res.data;
      }

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }

  async put(url, data, headers = {}, isAuthorized) {
    let apiUrl = baseURL + url;
    let fullHeaders = {};
    let token = store.state.login.loginTempToken;
    fullHeaders = {
      Authorization: token,
      "Content-Type": "application/json",
      ...headers,
    };

    try {
      const res = await axios.put(apiUrl, data, {
        headers: fullHeaders,
      });

      //check for code of response, if 200 set data.status to "OK" else set "ERROR"

      if (res.data.code === 200) {
        res.data.status = "OK";
        return res.data;
      } else if (res.data.code === 500) {
        res.data.status = "ERROR";
        return res.data;
      }

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
  // method for generate query string, get an object and return the query string
  queryStringGenerator(queryStringObj) {
    // define variables for keep queryString and index of item in itrerator
    let queryString = "";
    let indexOfQueryString = 0;

    for (let item in queryStringObj) {
      // check for item exist in queryStringObj
      if (queryStringObj.hasOwnProperty(item)) {
        indexOfQueryString += 1;

        // Because first query string is starts with '?' and the rest with '&'
        if (indexOfQueryString === 1) {
          queryString += "?" + item + "=" + queryStringObj[item];
        } else {
          queryString += "&" + item + "=" + queryStringObj[item];
        }
      }
    }

    return queryString;
  }
}
