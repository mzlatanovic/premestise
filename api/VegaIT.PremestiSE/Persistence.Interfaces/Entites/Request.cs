﻿using System;
using System.Collections.Generic;
using Util.Enums;
namespace Persistence.Interfaces.Entites
{
    public class Request
    {
        public int Id { get; set; }
        public int FromKindergardenId { get; set; }
        public DateTime SubmittedAt { get; set; }
        public string ParentEmail { get; set; }
        public string ParentName { get; set; }
        public string ParentPhoneNumber { get; set; }
        public string ChildName { get; set; }
        public AgeGroup Group { get; set; }
        public DateTime ChildBirthDate { get; set; }
        public List<int> KindergardenWishIds { get; set; }
    }
}