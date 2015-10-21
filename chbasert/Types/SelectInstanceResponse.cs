// (c) Microsoft. All rights reserved

using System.Xml.Serialization;

namespace CHBase.Types
{
    public sealed class SelectInstanceResponse : IHealthVaultType
    {
        public SelectInstanceResponse()
        {
        }

        [XmlElement("selected-instance", Order = 1)]
        public Instance SelectedInstance { get; set; }

        public void Validate()
        {
            SelectedInstance.ValidateOptional("SelectedInstance");
        }
    }
}
