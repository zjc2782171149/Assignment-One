import React, { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function InputWithButton({ searchName }) {
  const submitForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log("准备回传给page", data.get("myInput"));
    searchName(data.get("myInput"));
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <form
        onSubmit={submitForm}
        className="flex items-center justify-center space-x-2"
      >
        <label>
          <Input
            placeholder="请输入你要检查的名称"
            name="myInput"
            type="text"
          />
        </label>
        <Button type="submit">查询</Button>
      </form>
    </div>
  );
}

export default InputWithButton;
