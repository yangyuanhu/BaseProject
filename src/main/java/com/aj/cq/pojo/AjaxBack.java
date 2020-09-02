package com.aj.cq.pojo;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @author jian on 2017/4/24 20:56.
 */
public class AjaxBack implements Serializable, Cloneable {
	private String  msg     = "";
	private String  error   = "";
	private int   code    = 0;
	private boolean success = false;
	private String  field   = "";
	private int     total   = 0;
	private Object  content = "";


	public AjaxBack() {
	}

	private AjaxBack(boolean success) {
		this.success = success;
	}

	private static final AjaxBack SUCCESS = new AjaxBack(true);
	private static final AjaxBack ERROR   = new AjaxBack(false);

	public static AjaxBack ok() {
		try {
			return (AjaxBack) SUCCESS.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return new AjaxBack();
	}

	public static AjaxBack error() {
		try {
			return (AjaxBack) ERROR.clone();
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return null;
	}

	// setters
	public AjaxBack msg(String msg) {
		if (msg != null) {
			this.msg = msg;
		}
		return this;
	}

	public AjaxBack error(String error) {
		if (error != null) {
			this.error = error;
		}
		return this;
	}

	public AjaxBack code(int code) {
		this.code = code;
		return this;
	}

	public AjaxBack field(String field) {
		if (field != null) {
			this.field = field;
		}
		return this;
	}

	public AjaxBack total(int total) {
		this.total = total;
		return this;
	}

	public AjaxBack content(Object content) {
		if (content != null) {
			this.content = content;
		}
		return this;
	}

	public String getMsg() {
		return msg;
	}

	public String getError() {
		return error;
	}

	public int getCode() {
		return code;
	}

	public boolean isSuccess() {
		return success;
	}

	public String getField() {
		return field;
	}

	public int getTotal() {
		return total;
	}

	public Object getContent() {
		return content;
	}


	@Override
	public String toString() {
		return "Back{" +
				"msg='" + msg + '\'' +
				", error='" + error + '\'' +
				", code=" + code +
				", success=" + success +
				", field='" + field + '\'' +
				", total=" + total +
				", content=" + content +
				'}';
	}

	public Map<String, Object> toMap() {
		Map<String, Object> map = new HashMap<>();
		map.put("msg", msg);
		map.put("error", error);
		map.put("code", code);
		map.put("success", success);
		map.put("field", field);
		map.put("content", content);
		return map;
	}
}
